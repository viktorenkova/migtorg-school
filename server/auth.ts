import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./prisma.js";
import { env } from "./env.js";

const SESSION_COOKIE = "migtorg_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export function setSessionCookie(reply: FastifyReply, userId: string) {
  reply.setCookie(SESSION_COOKIE, userId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: env.cookieSecure,
    signed: true,
    maxAge: SESSION_MAX_AGE
  });
}

export function clearSessionCookie(reply: FastifyReply) {
  reply.clearCookie(SESSION_COOKIE, { path: "/" });
}

export function getSessionUserId(request: FastifyRequest) {
  const rawCookie = request.cookies[SESSION_COOKIE];

  if (!rawCookie) {
    return null;
  }

  const cookie = request.unsignCookie(rawCookie);
  return cookie.valid ? cookie.value : null;
}

export async function requireUser(request: FastifyRequest) {
  const userId = getSessionUserId(request);

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
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
}
