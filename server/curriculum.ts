import type { PrismaClient } from "@prisma/client";
import { getSignedObjectUrl } from "./storage.js";

export const COURSE_SLUG = "migtorg-pro-free-school";

export type LessonStatus = "locked" | "available" | "completed";

type CourseLesson = Awaited<ReturnType<typeof getCourseLessons>>[number];

async function getCourseLessons(prisma: PrismaClient) {
  const course = await prisma.course.findUnique({
    where: { slug: COURSE_SLUG },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" }
          }
        }
      }
    }
  });

  if (!course) {
    return [];
  }

  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, module }))
  );
}

export async function ensureEnrollment(prisma: PrismaClient, userId: string) {
  const course = await prisma.course.findUnique({ where: { slug: COURSE_SLUG } });

  if (!course) {
    throw new Error(`Course ${COURSE_SLUG} is not seeded`);
  }

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    update: {},
    create: { userId, courseId: course.id }
  });
}

export async function getProgressSummary(prisma: PrismaClient, userId: string) {
  const lessons = await getCourseLessons(prisma);
  const completed = await prisma.lessonProgress.count({
    where: {
      userId,
      lessonId: { in: lessons.map((lesson) => lesson.id) }
    }
  });

  return {
    completed,
    total: lessons.length,
    percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0
  };
}

export async function getLessonAccessMap(prisma: PrismaClient, userId: string) {
  const lessons = await getCourseLessons(prisma);
  const progress = await prisma.lessonProgress.findMany({
    where: { userId, lessonId: { in: lessons.map((lesson) => lesson.id) } }
  });
  const completedLessonIds = new Set(progress.map((item) => item.lessonId));
  const statuses = new Map<string, LessonStatus>();

  lessons.forEach((lesson, index) => {
    if (completedLessonIds.has(lesson.id)) {
      statuses.set(lesson.id, "completed");
      return;
    }

    if (index === 0 || completedLessonIds.has(lessons[index - 1].id)) {
      statuses.set(lesson.id, "available");
      return;
    }

    statuses.set(lesson.id, "locked");
  });

  return { lessons, statuses };
}

export async function getCurriculum(prisma: PrismaClient, userId: string) {
  const course = await prisma.course.findUnique({
    where: { slug: COURSE_SLUG },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" }
          },
          materials: { orderBy: { position: "asc" } }
        }
      }
    }
  });

  if (!course) {
    return null;
  }

  const { statuses } = await getLessonAccessMap(prisma, userId);
  const progress = await getProgressSummary(prisma, userId);

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    progress,
    modules: course.modules.map((module) => {
      const lessons = module.lessons.map((lesson) => ({
        id: lesson.id,
        slug: lesson.slug,
        number: `${module.position}.${lesson.position}`,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        status: statuses.get(lesson.id) ?? "locked"
      }));
      const moduleStatus = lessons.every((lesson) => lesson.status === "completed")
        ? "completed"
        : lessons.some((lesson) => lesson.status === "available" || lesson.status === "completed")
          ? "available"
          : "locked";

      return {
        id: module.id,
        slug: module.slug,
        number: String(module.position).padStart(2, "0"),
        routeLabel: module.routeLabel,
        title: module.title,
        description: module.description,
        result: module.result,
        status: moduleStatus,
        lessons,
        materials: module.materials.map((material) => ({
          id: material.id,
          title: material.title,
          type: material.type
        }))
      };
    })
  };
}

export async function canAccessLesson(prisma: PrismaClient, userId: string, lessonId: string) {
  const { statuses } = await getLessonAccessMap(prisma, userId);
  const status = statuses.get(lessonId);

  return status === "available" || status === "completed";
}

export async function canAccessModule(prisma: PrismaClient, userId: string, moduleId: string) {
  const { lessons, statuses } = await getLessonAccessMap(prisma, userId);

  return lessons.some(
    (lesson) => lesson.module.id === moduleId && (statuses.get(lesson.id) === "available" || statuses.get(lesson.id) === "completed")
  );
}

export async function getLessonPayload(prisma: PrismaClient, userId: string, lessonId: string) {
  const allowed = await canAccessLesson(prisma, userId, lessonId);

  if (!allowed) {
    return null;
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: true
    }
  });

  if (!lesson) {
    return null;
  }

  const video = lesson.videoObjectKey ? await getSignedObjectUrl(lesson.videoObjectKey) : null;

  return {
    id: lesson.id,
    slug: lesson.slug,
    number: `${lesson.module.position}.${lesson.position}`,
    title: lesson.title,
    description: lesson.description,
    duration: lesson.duration,
    videoUrl: video?.url ?? null,
    videoExpiresIn: video?.expiresIn ?? null,
    module: {
      id: lesson.module.id,
      slug: lesson.module.slug,
      number: String(lesson.module.position).padStart(2, "0"),
      title: lesson.module.title
    }
  };
}

export function getNextLesson(lessons: CourseLesson[], lessonId: string) {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);

  return index >= 0 ? lessons[index + 1] ?? null : null;
}
