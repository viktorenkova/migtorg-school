import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  LockKeyhole,
  LogOut,
  PlayCircle
} from "lucide-react";
import { api, type Curriculum, type CurriculumLesson, type CurriculumModule, type LessonDetails } from "../api";
import { useAuth } from "../auth";
import { GlowButton, Logo, SectionEyebrow } from "../components/ui";

export function RequireAuth({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="learn-loading">Загружаем доступ...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login?next=/learn" replace />;
  }

  return <>{children}</>;
}

function LearnLayout({ children }: PropsWithChildren) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="learn-shell">
      <header className="learn-header">
        <Logo href="/" />
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/learn">Обучение</Link>
        </nav>
        <div className="learn-user">
          <span>{user?.name}</span>
          <button type="button" onClick={handleLogout} aria-label="Выйти">
            <LogOut aria-hidden="true" />
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}

function useCurriculum() {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    setError("");

    try {
      setCurriculum(await api.curriculum());
    } catch {
      setError("Не удалось загрузить программу. Проверьте, что API и база данных запущены.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { curriculum, error, isLoading, refresh };
}

function getFirstAction(module: CurriculumModule) {
  const firstAvailable = module.lessons.find((lesson) => lesson.status === "available" || lesson.status === "completed");
  return firstAvailable ?? module.lessons[0] ?? null;
}

function pluralize(count: number, one: string, few: string, many: string) {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }

  if (mod10 === 1) {
    return one;
  }

  return mod10 >= 2 && mod10 <= 4 ? few : many;
}

function StatusBadge({ status }: { status: "locked" | "available" | "completed" }) {
  const label = status === "completed" ? "Завершено" : status === "available" ? "Доступно" : "Закрыто";

  return <span className={`learn-status learn-status-${status}`}>{label}</span>;
}

export function LearnDashboard() {
  const { curriculum, error, isLoading } = useCurriculum();

  if (isLoading) {
    return <LearnLayout><div className="learn-loading">Загружаем программу...</div></LearnLayout>;
  }

  if (error || !curriculum) {
    return <LearnLayout><div className="learn-error">{error}</div></LearnLayout>;
  }

  const nextStep = curriculum.modules
    .flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })))
    .find(({ lesson }) => lesson.status === "available");

  return (
    <LearnLayout>
      <main className="learn-main">
        <section className="learn-hero">
          <div>
            <SectionEyebrow>ЛИЧНЫЙ КАБИНЕТ</SectionEyebrow>
            <h1>Программа обучения MIGTORG PRO</h1>
            <p>Проходите уроки по порядку: каждый завершенный урок открывает следующий шаг в программе.</p>
            {nextStep ? (
              <GlowButton href={`/learn/${nextStep.module.slug}/${nextStep.lesson.slug}`} className="learn-hero-cta">
                Продолжить обучение <ArrowRight aria-hidden="true" />
              </GlowButton>
            ) : null}
          </div>
          <article className="learn-progress-card">
            <span>{curriculum.progress.percent}%</span>
            <strong>{curriculum.progress.completed} из {curriculum.progress.total} уроков</strong>
            <div className="learn-progress-bar" aria-hidden="true">
              <i style={{ width: `${curriculum.progress.percent}%` }} />
            </div>
          </article>
        </section>

        <section className="learn-module-grid" aria-label="Модули обучения">
          {curriculum.modules.map((module) => {
            const action = getFirstAction(module);
            const isLocked = module.status === "locked";

            return (
              <article key={module.id} className={`learn-module-card learn-module-card-${module.status}`}>
                <div className="learn-module-top">
                  <span className="learn-module-number">{module.number}</span>
                  <StatusBadge status={module.status} />
                </div>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
                <div className="learn-module-meta">
                  <span><PlayCircle aria-hidden="true" /> {module.lessons.length} {pluralize(module.lessons.length, "урок", "урока", "уроков")}</span>
                  <span><FileText aria-hidden="true" /> {module.materials.length} {pluralize(module.materials.length, "материал", "материала", "материалов")}</span>
                </div>
                {isLocked || !action ? (
                  <button className="learn-locked-button" type="button" disabled>
                    <LockKeyhole aria-hidden="true" /> Откроется позже
                  </button>
                ) : (
                  <Link className="learn-card-link" to={`/learn/${module.slug}`}>
                    Открыть модуль <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </LearnLayout>
  );
}

export function ModulePage() {
  const { moduleSlug } = useParams();
  const { curriculum, error, isLoading } = useCurriculum();
  const [materialError, setMaterialError] = useState("");

  const module = useMemo(
    () => curriculum?.modules.find((item) => item.slug === moduleSlug) ?? null,
    [curriculum, moduleSlug]
  );

  if (isLoading) {
    return <LearnLayout><div className="learn-loading">Загружаем модуль...</div></LearnLayout>;
  }

  if (error || !curriculum || !module) {
    return <LearnLayout><div className="learn-error">{error || "Модуль не найден."}</div></LearnLayout>;
  }

  const materialsAvailable = module.status !== "locked";

  const handleDownload = async (materialId: string) => {
    setMaterialError("");

    try {
      const response = await api.downloadMaterial(materialId);
      window.open(response.url, "_blank", "noopener,noreferrer");
    } catch {
      setMaterialError("Хранилище материалов еще не настроено или ссылка недоступна.");
    }
  };

  return (
    <LearnLayout>
      <main className="learn-main">
        <Link to="/learn" className="learn-back"><ArrowLeft aria-hidden="true" /> Все модули</Link>
        <section className="learn-module-detail">
          <div>
            <SectionEyebrow>МОДУЛЬ {module.number}</SectionEyebrow>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
          </div>
        </section>

        <section className="learn-module-section" aria-label="Уроки модуля">
          <h2>Уроки модуля</h2>
          <div className="learn-lesson-list">
            {module.lessons.map((lesson) => (
              <LessonRow key={lesson.id} module={module} lesson={lesson} />
            ))}
          </div>
        </section>

        <section className="module-materials">
          <h2>Материалы модуля</h2>
          <p>Рабочие файлы и памятки, которые помогают закрепить содержание уроков.</p>
          {materialError ? <p className="learn-error-inline">{materialError}</p> : null}
          <div>
            {module.materials.map((material) => (
              <button
                key={material.id}
                type="button"
                disabled={!materialsAvailable}
                onClick={() => void handleDownload(material.id)}
              >
                <Download aria-hidden="true" />
                <span>{material.title}</span>
                <small>{material.type}</small>
              </button>
            ))}
          </div>
        </section>
      </main>
    </LearnLayout>
  );
}

function LessonRow({ module, lesson }: { module: CurriculumModule; lesson: CurriculumLesson }) {
  const isLocked = lesson.status === "locked";

  return (
    <article className={`learn-lesson-row learn-lesson-row-${lesson.status}`}>
      <span className="learn-lesson-icon" aria-hidden="true">
        {lesson.status === "completed" ? <CheckCircle2 /> : isLocked ? <LockKeyhole /> : <PlayCircle />}
      </span>
      <div>
        <div className="learn-lesson-meta">
          <span>УРОК {lesson.number}</span>
          <StatusBadge status={lesson.status} />
        </div>
        <h2>{lesson.title}</h2>
        <p>{lesson.description}</p>
      </div>
      {isLocked ? (
        <button type="button" disabled>Откроется позже</button>
      ) : (
        <Link to={`/learn/${module.slug}/${lesson.slug}`}>Открыть урок</Link>
      )}
    </article>
  );
}

export function LessonPage() {
  const { moduleSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const { curriculum, error, isLoading, refresh: refreshCurriculum } = useCurriculum();
  const [lesson, setLesson] = useState<LessonDetails | null>(null);
  const [lessonError, setLessonError] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);

  const curriculumLesson = useMemo(() => {
    const module = curriculum?.modules.find((item) => item.slug === moduleSlug);
    return module?.lessons.find((item) => item.slug === lessonSlug) ?? null;
  }, [curriculum, lessonSlug, moduleSlug]);

  useEffect(() => {
    if (!curriculumLesson) {
      return;
    }

    api.lesson(curriculumLesson.id)
      .then(setLesson)
      .catch(() => setLessonError("Урок пока закрыт или недоступен."));
  }, [curriculumLesson]);

  const handleComplete = async () => {
    if (!lesson) {
      return;
    }

    setIsCompleting(true);

    try {
      const response = await api.completeLesson(lesson.id);
      await Promise.all([refresh(), refreshCurriculum()]);

      if (response.nextLesson?.status === "available") {
        navigate(`/learn/${response.nextLesson.moduleSlug}/${response.nextLesson.slug}`);
      }
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return <LearnLayout><div className="learn-loading">Открываем урок...</div></LearnLayout>;
  }

  if (error || lessonError || !curriculumLesson || !lesson) {
    return <LearnLayout><div className="learn-error">{error || lessonError || "Урок не найден."}</div></LearnLayout>;
  }

  return (
    <LearnLayout>
      <main className="learn-main">
        <Link to={`/learn/${lesson.module.slug}`} className="learn-back"><ArrowLeft aria-hidden="true" /> Вернуться к модулю</Link>
        <section className="lesson-layout">
          <article className="lesson-video-card">
            {lesson.videoUrl ? (
              <video controls src={lesson.videoUrl} />
            ) : (
              <div className="lesson-video-placeholder">
                <PlayCircle aria-hidden="true" />
                <span>Видео будет доступно после подключения приватного хранилища.</span>
              </div>
            )}
          </article>

          <aside className="lesson-side">
            <SectionEyebrow>МОДУЛЬ {lesson.module.number} / УРОК {lesson.number}</SectionEyebrow>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
            <div className="lesson-actions">
              <GlowButton type="button" onClick={handleComplete} disabled={isCompleting}>
                {isCompleting ? "Сохраняем..." : "Завершить урок"} <CheckCircle2 aria-hidden="true" />
              </GlowButton>
            </div>
          </aside>
        </section>
      </main>
    </LearnLayout>
  );
}
