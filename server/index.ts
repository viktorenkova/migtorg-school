import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { z, ZodError } from "zod";
import { clearSessionCookie, requireUser, setSessionCookie } from "./auth.js";
import {
  canAccessLesson,
  canAccessModule,
  COURSE_SLUG,
  ensureEnrollment,
  getCurriculum,
  getLessonAccessMap,
  getLessonPayload,
  getProgressSummary
} from "./curriculum.js";
import { env } from "./env.js";
import { prisma } from "./prisma.js";
import { getSignedObjectUrl } from "./storage.js";

const PASSWORD_MIN_LENGTH = 15;
const PASSWORD_MAX_LENGTH = 64;

const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
  phone: z.string().trim().regex(/^\+7\d{10}$/),
  city: z.string().trim().regex(/^[\p{L}\s-]{2,}$/u),
  experience: z.string().trim().min(1),
  auctionExperience: z.string().trim().min(1)
});

const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1)
});

async function authenticate(request: Parameters<typeof requireUser>[0], reply: import("fastify").FastifyReply) {
  const user = await requireUser(request);

  if (!user) {
    reply.code(401).send({ error: "unauthorized" });
    return null;
  }

  return user;
}

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: env.frontendOrigin,
    credentials: true
  });

  app.register(cookie, {
    secret: env.cookieSecret
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      const isRegisterRequest = request.url.split("?")[0] === "/api/auth/register";
      reply.code(400).send({ error: isRegisterRequest ? "registration_validation_failed" : "validation_failed" });
      return;
    }

    const handledError = error as { statusCode?: number; code?: string };
    const statusCode = typeof handledError.statusCode === "number" ? handledError.statusCode : 500;

    if (statusCode < 500) {
      reply.code(statusCode).send({ error: handledError.code ?? "request_failed" });
      return;
    }

    request.log.error(error);
    reply.code(500).send({ error: "server_error" });
  });

  app.get("/api/health", async () => ({ ok: true }));

  app.post("/api/auth/register", async (request, reply) => {
    const payload = registerSchema.parse(request.body);
    const course = await prisma.course.findUnique({
      where: { slug: COURSE_SLUG },
      select: { id: true }
    });

    if (!course) {
      reply.code(503).send({ error: "school_course_not_configured" });
      return;
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          passwordHash,
          phone: payload.phone,
          city: payload.city,
          experience: payload.experience,
          auctionExperience: payload.auctionExperience,
          enrollments: {
            create: { courseId: course.id }
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          experience: true,
          auctionExperience: true,
          createdAt: true
        }
      });

      setSessionCookie(reply, user.id);

      return {
        user,
        progress: await getProgressSummary(prisma, user.id)
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        reply.code(409).send({ error: "email_already_registered" });
        return;
      }

      throw error;
    }
  });

  app.post("/api/auth/login", async (request, reply) => {
    const payload = loginSchema.parse(request.body);
    const user = await prisma.user.findUnique({ where: { email: payload.email } });

    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      reply.code(401).send({ error: "invalid_credentials" });
      return;
    }

    await ensureEnrollment(prisma, user.id);
    setSessionCookie(reply, user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        experience: user.experience,
        auctionExperience: user.auctionExperience,
        createdAt: user.createdAt
      },
      progress: await getProgressSummary(prisma, user.id)
    };
  });

  app.post("/api/auth/logout", async (_request, reply) => {
    clearSessionCookie(reply);
    return { ok: true };
  });

  app.get("/api/me", async (request, reply) => {
    const user = await authenticate(request, reply);

    if (!user) {
      return;
    }

    return {
      user,
      progress: await getProgressSummary(prisma, user.id)
    };
  });

  app.get("/api/curriculum", async (request, reply) => {
    const user = await authenticate(request, reply);

    if (!user) {
      return;
    }

    const curriculum = await getCurriculum(prisma, user.id);

    if (!curriculum) {
      reply.code(404).send({ error: "curriculum_not_seeded" });
      return;
    }

    return curriculum;
  });

  app.get("/api/lessons/:lessonId", async (request, reply) => {
    const user = await authenticate(request, reply);

    if (!user) {
      return;
    }

    const { lessonId } = z.object({ lessonId: z.string().min(1) }).parse(request.params);
    const lesson = await getLessonPayload(prisma, user.id, lessonId);

    if (!lesson) {
      reply.code(403).send({ error: "lesson_locked" });
      return;
    }

    return lesson;
  });

  app.post("/api/lessons/:lessonId/complete", async (request, reply) => {
    const user = await authenticate(request, reply);

    if (!user) {
      return;
    }

    const { lessonId } = z.object({ lessonId: z.string().min(1) }).parse(request.params);
    const allowed = await canAccessLesson(prisma, user.id, lessonId);

    if (!allowed) {
      reply.code(403).send({ error: "lesson_locked" });
      return;
    }

    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      update: { completedAt: new Date(), status: "COMPLETED" },
      create: { userId: user.id, lessonId, status: "COMPLETED" }
    });

    const { lessons, statuses } = await getLessonAccessMap(prisma, user.id);
    const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
    const nextLesson = currentIndex >= 0 ? lessons[currentIndex + 1] ?? null : null;

    return {
      progress: await getProgressSummary(prisma, user.id),
      nextLesson: nextLesson
        ? {
            id: nextLesson.id,
            slug: nextLesson.slug,
            moduleSlug: nextLesson.module.slug,
            status: statuses.get(nextLesson.id) ?? "locked"
          }
        : null
    };
  });

  app.get("/api/materials/:materialId/download", async (request, reply) => {
    const user = await authenticate(request, reply);

    if (!user) {
      return;
    }

    const { materialId } = z.object({ materialId: z.string().min(1) }).parse(request.params);
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    });

    if (!material || !(await canAccessModule(prisma, user.id, material.moduleId))) {
      reply.code(403).send({ error: "material_locked" });
      return;
    }

    const signed = await getSignedObjectUrl(material.objectKey);

    if (!signed) {
      reply.code(503).send({ error: "storage_not_configured" });
      return;
    }

    return {
      url: signed.url,
      expiresIn: signed.expiresIn
    };
  });

  return app;
}

const app = buildApp();

app.listen({ host: env.apiHost, port: env.apiPort }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
