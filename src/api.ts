const API_BASE = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(code: string, status: number) {
    super(code);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  auctionExperience: string;
  createdAt: string;
};

export type ProgressSummary = {
  completed: number;
  total: number;
  percent: number;
};

export type LessonStatus = "locked" | "available" | "completed";

export type CurriculumLesson = {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  duration: number | null;
  status: LessonStatus;
};

export type CurriculumMaterial = {
  id: string;
  title: string;
  type: string;
};

export type CurriculumModule = {
  id: string;
  slug: string;
  number: string;
  routeLabel: string;
  title: string;
  description: string;
  result: string;
  status: LessonStatus;
  lessons: CurriculumLesson[];
  materials: CurriculumMaterial[];
};

export type Curriculum = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  progress: ProgressSummary;
  modules: CurriculumModule[];
};

export type LessonDetails = {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  duration: number | null;
  videoUrl: string | null;
  videoExpiresIn: number | null;
  module: {
    id: string;
    slug: string;
    number: string;
    title: string;
  };
};

export type AuthPayload = {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  experience?: string;
  auctionExperience?: string;
};

async function request<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    },
    ...options
  });

  const payload = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(payload?.error ?? "request_failed", response.status);
  }

  return payload as T;
}

export const api = {
  me: () => request<{ user: User; progress: ProgressSummary }>("/api/me"),
  register: (payload: Required<AuthPayload>) =>
    request<{ user: User; progress: ProgressSummary }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  login: (payload: Pick<AuthPayload, "email" | "password">) =>
    request<{ user: User; progress: ProgressSummary }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  logout: () => request<{ ok: true }>("/api/auth/logout", { method: "POST" }),
  curriculum: () => request<Curriculum>("/api/curriculum"),
  lesson: (lessonId: string) => request<LessonDetails>(`/api/lessons/${lessonId}`),
  completeLesson: (lessonId: string) =>
    request<{ progress: ProgressSummary; nextLesson: { moduleSlug: string; slug: string; status: LessonStatus } | null }>(
      `/api/lessons/${lessonId}/complete`,
      { method: "POST" }
    ),
  downloadMaterial: (materialId: string) =>
    request<{ url: string; expiresIn: number }>(`/api/materials/${materialId}/download`)
};
