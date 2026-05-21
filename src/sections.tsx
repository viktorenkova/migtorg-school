import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Calculator,
  Calendar,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  Fuel,
  Gauge,
  Gavel,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X
} from "lucide-react";
import { images } from "./constants";
import { useAuth } from "./auth";
import { getModuleSlugByIndex } from "./course";
import {
  accessBadges,
  heroBenefits,
  heroTrust,
  curriculumModules,
} from "./data";
import { CityInput, PhoneInput } from "./components/FormFields";
import { GlowButton, IconBox, Logo, Reveal, SectionEyebrow } from "./components/ui";

const benefitIcons = [ShieldCheck, BarChart3, Users];
const learningSteps = [
  {
    number: "01",
    title: "Смотрите уроки",
    text: "Короткие практические видео без лишней теории. Каждый урок отвечает на конкретный вопрос новичка.",
    tone: "coral",
    icon: images.learningVideoIcon
  },
  {
    number: "02",
    title: "Используете материалы",
    text: "Чек-листы, таблицы, калькуляторы, шаблоны писем и примеры расчётов.",
    tone: "coral",
    icon: images.learningMaterialsIcon
  },
  {
    number: "03",
    title: "Разбираете реальные лоты",
    text: "Учитесь смотреть на автомобиль глазами покупателя, который считает прибыль и риски.",
    tone: "coral",
    icon: images.learningLotReviewIcon
  },
  {
    number: "04",
    title: "Делаете первые шаги на Migtorg",
    text: "После обучения вы сможете осознанно выбирать лоты, считать ставку и участвовать в торгах.",
    tone: "green",
    icon: images.learningFirstStepsIcon
  }
] as const;
const guideItems = [
  "Почему нельзя ставить на лот без расчета максимальной цены",
  "Почему выигранный лот не всегда передают",
  "Чем опасны автомобили с “простыми” повреждениями",
  "Почему нельзя игнорировать логистику и стоянку",
  "Как новички переплачивают в торгах",
  "Почему осмотр до оплаты обязателен",
  "Что происходит при необоснованном отказе от лота"
];

const openAccessModal = () => {
  window.location.assign("/auth/register");
};

type SubmissionStatus = "idle" | "sending" | "success" | "error";

const FORM_ERROR_MESSAGE = "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам на почту.";

async function submitNetlifyForm(formName: string, payload: Record<string, string>) {
  const body = new URLSearchParams({
    "form-name": formName,
    ...payload
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });

  if (!response.ok) {
    throw new Error(`Netlify form submission failed: ${response.status}`);
  }
}

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="section-container grid min-h-[860px] items-center gap-10 pt-36 lg:grid-cols-[0.88fr_1.12fr] lg:pt-24">
        <div className="relative z-10 max-w-[690px]">
          <Reveal>
            <SectionEyebrow pill>Бесплатная школа</SectionEyebrow>
          </Reveal>

          <Reveal delay={0.07}>
            <h1 className="hero-title">
              Научитесь зарабатывать
              <br />
              на автомобильных
              <br />
              <span>аукционах</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="hero-lead">
              Поймите механику рынка, научитесь оценивать лоты, избегать ошибок и зарабатывать на
              перепродаже автомобилей с аукционов.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="hero-benefits">
              {heroBenefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div key={benefit} className="flex items-center gap-4 text-[16px] font-bold leading-snug text-white/90">
                    <IconBox Icon={Icon} />
                    <span>{benefit}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="hero-actions">
              <GlowButton type="button" className="min-h-[68px] px-8 text-[17px]" onClick={openAccessModal}>
                Получить доступ бесплатно <ArrowRight className="ml-3 h-5 w-5" />
              </GlowButton>
              <GlowButton href="#case" variant="secondary" className="hero-guide-button min-h-[68px] px-8 text-[17px]">
                Скачать гайд «7 ошибок новичков» <ArrowDown className="hero-guide-arrow" />
              </GlowButton>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="hero-trust">
              {heroTrust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="hero-visual">
          <div className="hero-laptop-frame" aria-hidden="true">
            <img
              className="hero-laptop"
              src={images.heroLaptop}
              alt=""
            />
          </div>
          <article className="hero-floating-card hero-floating-profit">
            <BarChart3 className="hero-floating-icon hero-floating-icon-green" />
            <div className="hero-floating-copy">
              <p>Средняя прибыль<br />на сделку</p>
              <strong>+312 780 ₽</strong>
            </div>
            <MiniSparkline />
          </article>
          <article className="hero-floating-card hero-floating-users">
            <Users className="hero-floating-icon hero-floating-icon-red" />
            <div className="hero-floating-copy">
              <p>Успешных учеников</p>
              <strong>2 847</strong>
              <span>по всей России</span>
            </div>
          </article>
          <article className="hero-floating-card hero-floating-roi">
            <Wallet className="hero-floating-icon hero-floating-icon-red" />
            <div className="hero-floating-copy">
              <p>ROI за 30 дней</p>
              <strong>+28,4%</strong>
            </div>
            <MiniSparkline />
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function MiniSparkline() {
  return (
    <span className="hero-chart" aria-hidden="true">
      <svg className="hero-sparkline" viewBox="0 0 120 54" focusable="false">
        <path className="hero-chart-fill" d="M4 44 L16 37 L28 39 L40 30 L52 33 L64 24 L76 26 L88 18 L100 20 L116 10 L116 54 L4 54 Z" />
        <path className="hero-chart-line" d="M4 44 L16 37 L28 39 L40 30 L52 33 L64 24 L76 26 L88 18 L100 20 L116 10" />
        <circle cx="116" cy="10" r="3.5" />
      </svg>
    </span>
  );
}

export function MarketEconomics() {
  const dealChecklist = [
    { text: "Проверить, может ли лот быть передан", Icon: ShieldCheck },
    { text: "Отличить перспективный автомобиль от бесполезного", Icon: Target, tag: "BID" },
    { text: "Заранее посчитать ремонт, логистику и комиссию", Icon: Calculator },
    { text: "Определить предельную ставку", Icon: Gavel, tag: "RISK" },
    { text: "Осмотреть автомобиль до оплаты", Icon: Search, tag: "VIN" },
    { text: "Понять, когда отказ от лота обоснован", Icon: LockKeyhole },
    { text: "Иметь план перепродажи еще до участия в торгах", Icon: TrendingUp, tag: "ROI" }
  ];

  return (
    <section id="economy" className="page-section actuality-section">
      <div className="section-container actuality-container">
        <Reveal>
          <div className="actuality-copy">
            <SectionEyebrow>Почему это актуально</SectionEyebrow>
            <h2 className="section-title actuality-title">
              На аукционах <span className="copy-accent-green">выигрывает</span> система,
              <br />
              а не удача
            </h2>
            <div className="actuality-text">
              <p>
                Лот может выглядеть выгодным, но без расчета ставки, проверки рисков и плана перепродажи сделка быстро
                уходит в минус. Прибыль появляется там, где решение принято по цифрам.
              </p>
            </div>
            <article className="actuality-conclusion">
              <ShieldCheck aria-hidden="true" />
              <span />
              <strong>MIGTORG PRO помогает пройти этот путь не вслепую, а по понятной системе.</strong>
            </article>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="actuality-check-card">
            <div className="actuality-card-header">
              <span className="actuality-target-icon" aria-hidden="true">
                <Target />
              </span>
              <h3>Что отличает сделку от ошибки</h3>
            </div>

            <ul className="actuality-checklist">
              {dealChecklist.map(({ text, Icon, tag }) => (
                <li key={text}>
                  <span className="actuality-checkmark" aria-hidden="true">
                    <CheckCircle2 />
                  </span>
                  <Icon className="actuality-row-icon" aria-hidden="true" />
                  <span className="actuality-item-text">{text}</span>
                  {tag ? <span className={`actuality-tag actuality-tag-${tag.toLowerCase()}`}>{tag}</span> : null}
                  <ChevronDown className="actuality-chevron" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function DealMechanics() {
  return (
    <section id="mechanics" className="page-section migtorg-pro-section">
      <div className="section-container migtorg-pro-container">
        <div className="migtorg-pro-top">
          <Reveal>
            <div className="migtorg-pro-copy">
              <SectionEyebrow>Что такое MIGTORG PRO</SectionEyebrow>
              <h2 className="section-title migtorg-pro-title">
                MIGTORG PRO — это <span>практическая школа</span> работы с автоаукционами
              </h2>
              <div className="migtorg-pro-text">
                <p>
                  Мы показываем, как устроен рынок, как принимаются решения по лотам, как оценивать автомобили,
                  рассчитывать ставку и снижать риски при покупке.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="pro-definition-card">
              <div className="pro-definition-header">
                <span className="pro-shield-icon" aria-hidden="true">
                  <ShieldCheck />
                </span>
                <h3>
                  Без обещаний.
                  <br />
                  Только <span>механика рынка.</span>
                </h3>
              </div>

              <div className="pro-definition-divider" />

              <div className="pro-definition-lists">
                <div className="pro-definition-list pro-definition-list-red">
                  <strong>Не обещаем:</strong>
                  <ul>
                    <li>
                      <X aria-hidden="true" />
                      гарантированную прибыль
                    </li>
                    <li>
                      <X aria-hidden="true" />
                      каждый лот “в плюс”
                    </li>
                  </ul>
                </div>

                <div className="pro-definition-list pro-definition-list-green">
                  <strong>Показываем:</strong>
                  <ul>
                    <li>
                      <CheckCircle2 aria-hidden="true" />
                      механику торгов
                    </li>
                    <li>
                      <CheckCircle2 aria-hidden="true" />
                      расчет ставки
                    </li>
                    <li>
                      <CheckCircle2 aria-hidden="true" />
                      оценку рисков
                    </li>
                    <li>
                      <CheckCircle2 aria-hidden="true" />
                      работу с лотами
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guideStatus, setGuideStatus] = useState<SubmissionStatus>("idle");

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && guideStatus !== "sending") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guideStatus, isModalOpen]);

  const openGuideModal = () => {
    setGuideStatus("idle");
    setIsModalOpen(true);
  };

  const closeGuideModal = () => {
    if (guideStatus !== "sending") {
      setIsModalOpen(false);
    }
  };

  const handleGuideSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (guideStatus === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setGuideStatus("sending");

    try {
      await submitNetlifyForm("guide-download", {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        source: "guide"
      });

      form.reset();
      setGuideStatus("success");
    } catch {
      setGuideStatus("error");
    }
  };

  return (
    <>
      <section id="case" className="page-section guide-section">
        <div className="section-container guide-container">
          <Reveal className="guide-copy">
            <SectionEyebrow>БЕСПЛАТНЫЙ ГАЙД</SectionEyebrow>
            <h2 className="section-title guide-title">
              Скачайте <span className="copy-accent-red">бесплатный</span> гайд
              <br />
              “7 ошибок новичков
              <br />
              на автоаукционах”
            </h2>
            <p className="section-subtitle guide-subtitle">
              Короткий практический материал для тех, кто хочет избежать самых дорогих ошибок ещё до первой ставки.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="guide-card-wrap">
            <article className="guide-card">
              <div className="guide-card-top">
                <span>
                  <FileText aria-hidden="true" />
                  PDF
                </span>
                <span>Бесплатно</span>
                <span>7 ошибок</span>
              </div>
              <h3>Что внутри гайда</h3>
              <ul className="guide-list">
                {guideItems.map((item) => (
                  <li key={item}>
                    <span className="guide-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.12} className="guide-action">
            <GlowButton type="button" className="guide-cta-button" onClick={openGuideModal}>
              Скачать бесплатный гайд <ArrowRight aria-hidden="true" />
            </GlowButton>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="guide-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={closeGuideModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-modal-title"
              className="guide-modal"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="guide-modal-close"
                aria-label="Закрыть форму"
                disabled={guideStatus === "sending"}
                onClick={closeGuideModal}
              >
                <X aria-hidden="true" />
              </button>

              {guideStatus === "success" ? (
                <div className="guide-success">
                  <span className="guide-success-icon" aria-hidden="true">
                    <CheckCircle2 />
                  </span>
                  <h2 id="guide-modal-title">Гайд отправлен на вашу почту.</h2>
                  <p>Также мы можем прислать вам доступ к бесплатной школе MIGTORG PRO.</p>
                  <button
                    type="button"
                    className="button button-outline guide-success-link"
                    onClick={() => {
                      setIsModalOpen(false);
                      openAccessModal();
                    }}
                  >
                    Получить доступ к школе <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="guide-modal-header">
                    <SectionEyebrow>БЕСПЛАТНЫЙ ГАЙД</SectionEyebrow>
                    <h2 id="guide-modal-title">Скачать бесплатный гайд</h2>
                    <p>
                      Оставьте контакты — и мы отправим гайд “7 ошибок новичков на автоаукционах” на вашу почту.
                    </p>
                  </div>

                  <form
                    name="guide-download"
                    method="post"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    className="guide-form"
                    onChange={() => {
                      if (guideStatus === "error") {
                        setGuideStatus("idle");
                      }
                    }}
                    onSubmit={handleGuideSubmit}
                  >
                    <input type="hidden" name="form-name" value="guide-download" />
                    <input type="hidden" name="bot-field" />
                    <label>
                      <span>Имя</span>
                      <input type="text" name="name" placeholder="Ваше имя" autoComplete="name" disabled={guideStatus === "sending"} required />
                    </label>
                    <label>
                      <span>Телефон</span>
                      <PhoneInput name="phone" autoComplete="tel" disabled={guideStatus === "sending"} required />
                    </label>
                    <label>
                      <span>Email</span>
                      <input type="email" name="email" placeholder="example@mail.ru" autoComplete="email" disabled={guideStatus === "sending"} required />
                    </label>

                    <GlowButton type="submit" className="guide-submit-button" disabled={guideStatus === "sending"}>
                      {guideStatus === "sending" ? "Отправляем..." : "Получить гайд"}
                    </GlowButton>

                    {guideStatus === "error" ? <p className="form-status form-status-error">{FORM_ERROR_MESSAGE}</p> : null}
                    <p>Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const learningFlowSteps = [
  { label: "Лот", Icon: CarFront, tone: "red" },
  { label: "Оценка", Icon: Search, tone: "red" },
  { label: "Ставка", Icon: Gavel, tone: "red" },
  { label: "Передача", Icon: FileText, tone: "coral" },
  { label: "Осмотр", Icon: ShieldCheck, tone: "white" },
  { label: "Прибыль", Icon: ChartNoAxesCombined, tone: "green" }
] as const;

const learningSkillGroups = [
  {
    number: "01",
    title: "Поиск и оценка лота",
    icon: images.learningOutcomeLotIcon,
    skills: [
      "Понимать, как автомобили попадают на аукцион",
      "Отличать перспективные лоты от рискованных",
      "Читать карточку лота и видеть важные детали",
      "Оценивать повреждения по фото"
    ]
  },
  {
    number: "02",
    title: "Торги и передача",
    icon: images.learningOutcomeAuctionIcon,
    skills: [
      "Считать максимальную ставку",
      "Пользоваться закрытыми и открытыми торгами",
      "Понимать, когда лот могут передать",
      "Грамотно действовать после передачи"
    ]
  },
  {
    number: "03",
    title: "Проверка и расчет",
    icon: images.learningOutcomeChecklistIcon,
    skills: [
      "Организовать осмотр автомобиля",
      "Проверить юридические риски",
      "Рассчитать ремонт, логистику и прибыль",
      "Избежать типовых ошибок новичков"
    ]
  }
] as const;

export function ProgramModules() {
  return (
    <section id="program" className="page-section learning-section">
      <div className="section-container learning-container">
        <Reveal className="learning-copy">
          <div>
            <SectionEyebrow>Чему вы научитесь</SectionEyebrow>
            <h2 className="learning-title">
              После обучения
              <br />
              вы будете понимать
              <span>весь путь сделки</span>
            </h2>
            <p className="learning-subtitle">
              От появления автомобиля на аукционе до проверки, ставки, передачи, осмотра, ремонта и расчета прибыли.
            </p>

            <article className="learning-flow-card" aria-label="Путь сделки">
              <h3>Путь сделки</h3>
              <div className="learning-flow-track" aria-hidden="true">
                {learningFlowSteps.map((step, index) => {
                  const Icon = step.Icon;

                  return (
                    <div key={step.label} className={`learning-flow-step learning-flow-step-${step.tone}`}>
                      <span className="learning-flow-node">
                        <span />
                      </span>
                      <Icon className="learning-flow-icon" />
                      <strong>{step.label}</strong>
                    </div>
                  );
                })}
              </div>
            </article>

            <LearningCarVisual />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="learning-checklist-wrap">
          <article className="learning-checklist-card">
            <h3>После прохождения школы вы сможете:</h3>
            <div className="learning-skill-groups">
              {learningSkillGroups.map((group) => (
                <section key={group.number} className="learning-skill-group">
                  <div className="learning-group-visual" aria-hidden="true">
                    <span className="learning-group-number">{group.number}</span>
                    <span className="learning-group-icon">
                      <img src={group.icon} alt="" loading="lazy" decoding="async" />
                    </span>
                  </div>
                  <div className="learning-group-content">
                    <h4>{group.title}</h4>
                    <ul>
                      {group.skills.map((skill) => (
                        <li key={skill}>
                          <CheckCircle2 aria-hidden="true" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function LearningCarVisual() {
  return (
    <div className="learning-car-visual" aria-hidden="true">
      <img src={images.learningCar} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

const curriculumIcons = [ChartNoAxesCombined, Gauge, Target, Search, Calculator, Gavel, ClipboardList] as const;

export function LiveLotReview() {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const { user } = useAuth();

  const toggleModule = (moduleNumber: string) => {
    setOpenModules((current) => {
      if (current.includes(moduleNumber)) {
        return current.filter((item) => item !== moduleNumber);
      }

      const shouldKeepSingleOpen =
        typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;

      return shouldKeepSingleOpen ? [moduleNumber] : [...current, moduleNumber];
    });
  };

  const openAccessModal = () => {
    window.location.assign(user ? "/learn" : "/auth/register");
  };

  return (
    <section id="reviews" className="page-section curriculum-section">
      <div className="section-container curriculum-container">
        <Reveal>
          <div className="curriculum-header">
            <SectionEyebrow>ПРОГРАММА ОБУЧЕНИЯ</SectionEyebrow>
            <h2 className="section-title curriculum-title">Программа обучения MIGTORG PRO</h2>
            <p className="section-subtitle curriculum-subtitle">
              7 модулей — от понимания рынка до первой стратегии работы с аукционом.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="curriculum-route" aria-label="Маршрут программы">
            {curriculumModules.map((module, index) => (
              <span key={module.number} className={index === curriculumModules.length - 1 ? "is-final" : ""}>
                <b>{module.number}</b> {module.routeLabel}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="curriculum-accordion">
            {curriculumModules.map((module, index) => {
              const Icon = curriculumIcons[index];
              const isOpen = openModules.includes(module.number);
              const contentId = `curriculum-module-${module.number}`;
              const moduleSlug = getModuleSlugByIndex(index);
              const lessonPath = `/learn/${moduleSlug}/lesson-1`;
              const accessPath = user ? lessonPath : `/auth/register?next=${encodeURIComponent(lessonPath)}`;

              return (
                <article key={module.number} className={`curriculum-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="curriculum-trigger"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleModule(module.number)}
                  >
                    <span className="curriculum-number">{module.number}</span>
                    <span className="curriculum-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="curriculum-trigger-title">{module.title}</span>
                    <ChevronDown className="curriculum-chevron" aria-hidden="true" />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={contentId}
                        className="curriculum-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="curriculum-panel-inner">
                          <div className="curriculum-block">
                            <h4>Описание</h4>
                            <p>{module.description}</p>
                          </div>

                          <div className="curriculum-block">
                            <h4>Что внутри модуля</h4>
                            <ul className="curriculum-checklist">
                              {module.inside.map((item) => (
                                <li key={item}>
                                  <CheckCircle2 aria-hidden="true" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="curriculum-block">
                            <h4>Материалы</h4>
                            <div className="curriculum-materials">
                              {module.materials.map((material) => (
                                <span key={material}>{material}</span>
                              ))}
                            </div>
                          </div>

                          <article className="curriculum-result">
                            <ShieldCheck aria-hidden="true" />
                            <div>
                              <h4>Результат</h4>
                              <p>{module.result}</p>
                            </div>
                          </article>

                          <div className="curriculum-lesson-access">
                            <div>
                              <LockKeyhole aria-hidden="true" />
                              <span>{user ? "Урок доступен в личном кабинете" : "Доступ откроется после регистрации"}</span>
                            </div>
                            <GlowButton href={accessPath} className="curriculum-open-lesson-button">
                              {user ? "Открыть урок" : "Зарегистрироваться и открыть урок"} <ArrowRight aria-hidden="true" />
                            </GlowButton>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="curriculum-cta">
            <p>Хотите пройти программу и получить доступ к материалам?</p>
            <GlowButton type="button" className="curriculum-cta-button" onClick={openAccessModal}>
              Получить доступ к школе <ArrowRight aria-hidden="true" />
            </GlowButton>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function LearningFlow() {
  return (
    <section className="page-section learning-flow-section">
      <div className="section-container learning-flow-container">
        <Reveal>
          <div className="learning-flow-header">
            <SectionEyebrow>КАК ПРОХОДИТ ОБУЧЕНИЕ</SectionEyebrow>
            <h2 className="section-title learning-flow-title">Как устроено обучение</h2>
            <p className="section-subtitle learning-flow-subtitle">
              Пошаговый формат: от коротких уроков и рабочих материалов до разбора реальных лотов и первых действий на площадке.
            </p>
          </div>
        </Reveal>

        <div className="learning-flow-grid" aria-label="Порядок прохождения обучения">
          {learningSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <article className={`learning-step-card learning-step-card-${step.tone}`}>
                <div className="learning-step-top">
                  <span className="learning-step-number">{step.number}</span>
                  <span className="learning-step-icon" aria-hidden="true">
                    <img src={step.icon} alt="" loading="lazy" />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <article className="learning-flow-note">
            <ShieldCheck aria-hidden="true" />
            <p>
              Формат обучения построен вокруг практики: <span>каждый материал помогает принять более точное решение по лоту.</span>
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const schoolAudienceCards = [
  {
    number: "01",
    title: "Новичкам",
    text: "Если вы хотите разобраться, как устроены автоаукционы, но не знаете, с чего начать.",
    icon: images.audienceBeginner,
    tone: "coral"
  },
  {
    number: "02",
    title: "Перекупам",
    text: "Если вы уже работаете с автомобилями и хотите добавить новый канал поиска лотов.",
    icon: images.audienceDealer,
    tone: "coral"
  },
  {
    number: "03",
    title: "Автоподборщикам",
    text: "Если вы хотите расширить экспертизу и понимать рынок страховых и аукционных автомобилей.",
    icon: images.audienceInspector,
    tone: "coral"
  },
  {
    number: "04",
    title: "Владельцам СТО",
    text: "Если вы можете восстанавливать автомобили и хотите находить объекты с потенциальной маржой.",
    icon: images.audienceService,
    tone: "coral"
  },
  {
    number: "05",
    title: "Предпринимателям",
    text: "Если вы рассматриваете перепродажу автомобилей как дополнительное направление бизнеса.",
    icon: images.audienceBusiness,
    tone: "green"
  }
] as const;

export function Community() {
  return (
    <section id="community" className="page-section community-section">
      <div className="section-container community-container">
        <Reveal>
          <div className="community-header">
            <SectionEyebrow>ДЛЯ КОГО ШКОЛА</SectionEyebrow>
            <h2 className="section-title community-title">Кому подойдёт MIGTORG PRO</h2>
            <p className="section-subtitle">
              Школа помогает разным участникам рынка понять механику автоаукционов и использовать её под свои задачи.
            </p>
          </div>
        </Reveal>

        <div className="community-audience-grid">
          {schoolAudienceCards.map((card, index) => (
            <Reveal key={card.number} delay={index * 0.06}>
              <article className={`community-audience-card ${card.tone === "green" ? "community-audience-card-green" : ""}`}>
                <div className="community-audience-top">
                  <span className="community-audience-number">{card.number}</span>
                  <span className="community-audience-icon" aria-hidden="true">
                    <img src={card.icon} alt="" loading="lazy" decoding="async" />
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <article className="community-audience-note">
            <ShieldCheck aria-hidden="true" />
            <p>
              Школа даёт инструменты, которые <span>работают в реальных условиях рынка.</span>
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const realCaseTags = [
  { label: "Москва", Icon: MapPin },
  { label: "Выпуск 2022", Icon: Calendar },
  { label: "Бензиновый", Icon: Fuel },
  { label: "Пробег 122 481 км", Icon: Gauge }
] as const;

const realCasePrices = [
  { label: "Стартовая цена", value: "1 100 000 ₽" },
  { label: "Шаг ставки", value: "1 000 ₽" },
  { label: "Выкупить без торга", value: "1 200 000 ₽" }
] as const;

const realCaseAnalysis = [
  {
    title: "Что смотрим",
    text: "Повреждения, ликвидность модели, стоимость ремонта, регион, документы, логистика.",
    Icon: Search
  },
  {
    title: "Что считаем",
    text: "Максимальная ставка, резерв риска, прогнозная цена продажи.",
    Icon: Calculator
  },
  {
    title: "Решение",
    text: "Участвовать / не участвовать / ждать повторных торгов.",
    Icon: Target
  }
] as const;

const realCaseChecklist = [
  "Почему лот интересен",
  "Какие риски видим по фото",
  "Какие расходы нужно заложить",
  "Где стоп-ставка",
  "При каком результате сделка имеет смысл"
] as const;

const faqItems = [
  {
    question: "Школа действительно бесплатная?",
    answer: "Да, базовое обучение MIGTORG PRO доступно бесплатно. Цель школы — помочь новым участникам разобраться в рынке и начать осознанно работать с площадкой."
  },
  {
    question: "Нужно ли уже быть перекупом?",
    answer: "Нет. Школа рассчитана на новичков, но будет полезна и тем, кто уже работает с автомобилями."
  },
  {
    question: "Можно ли гарантированно заработать после обучения?",
    answer: "Нет. Мы не обещаем гарантированную прибыль. Мы обучаем механике рынка, расчёту ставок, оценке рисков и работе с лотами."
  },
  {
    question: "Нужен ли большой стартовый капитал?",
    answer: "Размер капитала зависит от выбранной стратегии, типа автомобилей и региона. В школе мы показываем, как считать бюджет и не заходить в сделки без понимания расходов."
  },
  {
    question: "Что будет после регистрации?",
    answer: "Вы получите доступ к материалам школы, гайдам и практическим заданиям. Также сможете зарегистрироваться на площадке Migtorg и начать изучать реальные лоты."
  },
  {
    question: "Нужно ли самому ремонтировать автомобили?",
    answer: "Нет. Можно работать через СТО, партнёров, осмотрщиков и логистов. Но важно заранее понимать стоимость ремонта и сроки."
  },
  {
    question: "Что если я выиграю лот, но автомобиль не передадут?",
    answer: "Такое возможно. В школе объясняется, почему это происходит и как формировать воронку ставок, чтобы не зависеть от одного лота."
  },
  {
    question: "Что если после осмотра автомобиль окажется хуже, чем в карточке?",
    answer: "Если есть существенные несоответствия, их нужно зафиксировать и оформить мотивированный отказ. В школе есть шаблоны и чек-листы для таких ситуаций."
  }
] as const;

export function RealCases() {
  const openAccessModal = () => {
    window.location.assign("/auth/register");
  };

  return (
    <section id="real-cases" className="page-section real-cases-section">
      <div className="section-container real-cases-container">
        <Reveal>
          <div className="real-cases-header">
            <SectionEyebrow>РЕАЛЬНЫЕ КЕЙСЫ</SectionEyebrow>
            <h2 className="section-title real-cases-title">Реальные кейсы</h2>
            <p className="section-subtitle real-cases-subtitle">
              Ниже — примерный формат разбора, который используется в обучении.
              <br />
              <span>Реальные кейсы школы будут показывать полный путь: от выбора лота до результата.</span>
            </p>
          </div>
        </Reveal>

        <div className="real-cases-layout">
          <Reveal delay={0.08}>
            <article className="lot-demo-card" aria-label="Демонстрационная карточка лота">
              <div className="lot-demo-media">
                <img src={images.caseBmw} alt="Кроссовер для демонстрационного разбора лота" loading="lazy" decoding="async" />
                <div className="lot-demo-badges" aria-label="Статусы лота">
                  <span className="lot-demo-badge lot-demo-badge-red">
                    <BadgeCheck aria-hidden="true" />
                    Новый лот
                  </span>
                  <span className="lot-demo-badge lot-demo-badge-green">
                    <CheckCircle2 aria-hidden="true" />
                    Готов к передаче
                  </span>
                </div>
              </div>

              <div className="lot-demo-body">
                <div className="lot-demo-meta">
                  <span>
                    <FileText aria-hidden="true" />
                    Лот № 788354
                  </span>
                  <span>
                    <Gavel aria-hidden="true" />
                    Открытый торг
                  </span>
                  <span className="lot-demo-active">
                    <i aria-hidden="true" />
                    Активен
                  </span>
                </div>

                <h3>Geely Coolray</h3>

                <div className="lot-demo-tags" aria-label="Параметры лота">
                  {realCaseTags.map(({ label, Icon }) => (
                    <span key={label}>
                      <Icon aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>

                <dl className="lot-demo-prices">
                  {realCasePrices.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <a className="lot-demo-link" href="https://migtorg.com" target="_blank" rel="noreferrer" aria-label="Перейти на сайт migtorg.com">
                  Подробнее <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.14}>
            <article className="case-analysis-card">
              <div className="case-analysis-top">
                <span className="case-analysis-icon" aria-hidden="true">
                  <FileText />
                </span>
                <div>
                  <span className="case-analysis-badge">Пример разбора</span>
                  <h3>Автомобиль: кроссовер 2022 года</h3>
                  <p>
                    <span>Сценарий:</span> восстановление и перепродажа
                  </p>
                </div>
              </div>

              <div className="case-analysis-list">
                {realCaseAnalysis.map(({ title, text, Icon }) => (
                  <div key={title} className="case-analysis-row">
                    <span className="case-analysis-row-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="case-analysis-checklist">
                {realCaseChecklist.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <GlowButton type="button" className="real-cases-cta" onClick={openAccessModal}>
                Хочу научиться так разбирать лоты
              </GlowButton>

              <p className="real-cases-note">Покажем, как принимать решения по лотам без хаотичных ставок.</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openAccessModal = () => {
    window.location.assign("/auth/register");
  };

  return (
    <section id="faq" className="page-section faq-section">
      <div className="section-container faq-container">
        <Reveal className="faq-copy">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="section-title faq-title">Частые вопросы</h2>
          <p className="section-subtitle faq-subtitle">
            Собрали ответы на главные вопросы перед стартом обучения и работой с автоаукционами.
          </p>

          <article className="faq-trust-card">
            <span className="faq-trust-icon" aria-hidden="true">
              <ShieldCheck />
            </span>
            <div>
              <h3>Без обещаний дохода</h3>
              <p>Мы не гарантируем прибыль — мы показываем механику рынка, расчёт ставок и способы снижать риски.</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="faq-accordion-wrap">
          <div className="faq-accordion">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const number = String(index + 1).padStart(2, "0");
              const answerId = `faq-answer-${number}`;

              return (
                <article key={item.question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="faq-number">{number}</span>
                    <span className="faq-question">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      {isOpen ? <Minus /> : <Plus />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={answerId}
                        className="faq-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>

          <article className="faq-cta">
            <div className="faq-cta-mark" aria-hidden="true">?</div>
            <div>
              <h3>Остались вопросы?</h3>
              <p>Начните с бесплатного обучения.</p>
            </div>
            <GlowButton type="button" className="faq-cta-button" onClick={openAccessModal}>
              Получить доступ к школе <ArrowRight aria-hidden="true" />
            </GlowButton>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experience, setExperience] = useState("Новичок");
  const [auctionExperience, setAuctionExperience] = useState("Нет");
  const [accessStatus, setAccessStatus] = useState<SubmissionStatus>("idle");
  const experienceOptions = ["Новичок", "Перекуп", "Автоподборщик", "СТО/ремонт", "Другое"];

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && accessStatus !== "sending") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [accessStatus, isModalOpen]);

  useEffect(() => {
    const handleOpenAccessModal = () => {
      setAccessStatus("idle");
      setIsModalOpen(true);
    };

    window.addEventListener("migtorg:open-access-modal", handleOpenAccessModal);

    return () => {
      window.removeEventListener("migtorg:open-access-modal", handleOpenAccessModal);
    };
  }, []);

  const openAccessForm = () => {
    setAccessStatus("idle");
    setIsModalOpen(true);
  };

  const closeAccessModal = () => {
    if (accessStatus !== "sending") {
      setIsModalOpen(false);
    }
  };

  const handleAccessSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessStatus === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setAccessStatus("sending");

    try {
      await submitNetlifyForm("school-access", {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        city: String(formData.get("city") ?? "").trim(),
        experience,
        auctionExperience,
        source: "access"
      });

      form.reset();
      setAccessStatus("success");
    } catch {
      setAccessStatus("error");
    }
  };

  return (
    <>
      <section id="access" className="page-section final-cta-section">
        <div className="section-container final-cta-container">
          <Reveal>
            <article className="final-cta-panel">
              <div className="final-cta-copy">
                <SectionEyebrow>ДОСТУП К ШКОЛЕ</SectionEyebrow>
                <h2>
                  Хотите разобраться,
                  <br />
                  как <span className="copy-accent-green">зарабатывать</span> на автоаукционах
                  <br />
                  без хаотичных ставок?
                </h2>
                <p>
                  Получите доступ к бесплатному обучению MIGTORG PRO: разборы лотов, механика торгов и
                  система принятия решений.
                </p>
                <div className="final-cta-chips" aria-label="Преимущества доступа">
                  {accessBadges.map((badge) => (
                    <span key={badge}>
                      <CheckCircle2 aria-hidden="true" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="final-cta-action">
                <GlowButton href="/auth/register" className="access-cta-button">
                  Получить доступ к школе <ArrowRight aria-hidden="true" />
                </GlowButton>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="access-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={closeAccessModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="access-modal-title"
              className="access-modal"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="access-modal-close"
                aria-label="Закрыть форму"
                disabled={accessStatus === "sending"}
                onClick={closeAccessModal}
              >
                <X aria-hidden="true" />
              </button>

              {accessStatus === "success" ? (
                <div className="access-success">
                  <span className="guide-success-icon" aria-hidden="true">
                    <CheckCircle2 />
                  </span>
                  <SectionEyebrow>ДОСТУП К ШКОЛЕ</SectionEyebrow>
                  <h2 id="access-modal-title">Заявка отправлена.</h2>
                  <p>Мы получили ваши данные и свяжемся с вами по указанным контактам.</p>
                </div>
              ) : (
                <>
                  <div className="access-modal-header">
                    <SectionEyebrow>ДОСТУП К ШКОЛЕ</SectionEyebrow>
                    <h2 id="access-modal-title">Заявка на доступ</h2>
                    <p>
                      Заполните короткую анкету — и мы откроем доступ к бесплатному обучению MIGTORG PRO.
                    </p>
                  </div>

                  <form
                    name="school-access"
                    method="post"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    className="access-form"
                    onChange={() => {
                      if (accessStatus === "error") {
                        setAccessStatus("idle");
                      }
                    }}
                    onSubmit={handleAccessSubmit}
                  >
                    <input type="hidden" name="form-name" value="school-access" />
                    <input type="hidden" name="bot-field" />
                    <div className="access-form-grid">
                      <label>
                        <span>Имя</span>
                        <input type="text" name="name" placeholder="Ваше имя" autoComplete="name" disabled={accessStatus === "sending"} required />
                      </label>
                      <label>
                        <span>Телефон</span>
                        <PhoneInput name="phone" autoComplete="tel" disabled={accessStatus === "sending"} required />
                      </label>
                      <label>
                        <span>Email</span>
                        <input type="email" name="email" placeholder="example@mail.ru" autoComplete="email" disabled={accessStatus === "sending"} required />
                      </label>
                      <label>
                        <span>Город</span>
                        <CityInput
                          name="city"
                          listId="access-city-options"
                          placeholder="Ваш город"
                          autoComplete="address-level2"
                          disabled={accessStatus === "sending"}
                          required
                        />
                      </label>
                    </div>

                    <fieldset className="access-choice-group">
                      <legend>Опыт в авто:</legend>
                      <div className="access-segmented">
                        {experienceOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={experience === option ? "is-selected" : ""}
                            aria-pressed={experience === option}
                            disabled={accessStatus === "sending"}
                            onClick={() => setExperience(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="access-choice-group">
                      <legend>Есть ли опыт участия в автоаукционах?</legend>
                      <div className="access-toggle">
                        {["Да", "Нет"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`${auctionExperience === option ? "is-selected" : ""} ${option === "Да" ? "is-positive" : ""}`}
                            aria-pressed={auctionExperience === option}
                            disabled={accessStatus === "sending"}
                            onClick={() => setAuctionExperience(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <GlowButton type="submit" className="access-submit-button" disabled={accessStatus === "sending"}>
                      {accessStatus === "sending" ? "Отправляем..." : "Получить доступ к школе"}
                    </GlowButton>

                    {accessStatus === "error" ? <p className="form-status form-status-error">{FORM_ERROR_MESSAGE}</p> : null}
                    <p>
                      Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных и получением
                      информационных материалов от Migtorg.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const footerNavItems = [
  { label: "Экономика", href: "#economy" },
  { label: "Механика", href: "#mechanics" },
  { label: "Гайд", href: "#case" },
  { label: "Программа", href: "#program" },
  { label: "Доступ к школе", href: "#access" }
] as const;

const footerUserItems = [
  { label: "Войти в аккаунт", href: "#top" },
  { label: "Получить доступ", href: "#access", opensAccessModal: true },
  { label: "Поддержка", href: "#top" },
  { label: "FAQ", href: "#faq" },
  { label: "Политика конфиденциальности", href: "#top" }
] as const;

const footerContactItems = [
  {
    label: "Телефон",
    value: "+7 (495) 649 91 99",
    href: "tel:+74956499199",
    Icon: Phone,
    tone: "coral"
  },
  {
    label: "WhatsApp",
    value: "+7 (926) 511 43 99",
    href: "https://wa.me/79265114399",
    Icon: MessageCircle,
    tone: "green"
  },
  {
    label: "E-mail",
    value: "school@migtorg.com",
    href: "mailto:school@migtorg.com",
    Icon: Mail,
    tone: "coral"
  },
  {
    label: "Адрес",
    value: "109 052, г. Москва, ул. Смирновская, д. 25, стр. 16, подъезд 2, 4 этаж",
    href: undefined,
    Icon: MapPin,
    tone: "coral"
  }
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-top">
          <Logo small />
          <p>Автомобильные аукционы под контролем. Аналитика, финансы и результат.</p>
          <a href="#top" className="back-top">
            <span aria-hidden="true">↑</span>
            Наверх
          </a>
        </div>

        <div className="footer-grid">
          <article className="footer-card footer-about">
            <span className="footer-card-icon" aria-hidden="true">
              <ShieldCheck />
            </span>
            <h3>О проекте</h3>
            <p>
              MIGTORG PRO — школа автомобильных аукционов для новичков и профессионалов. Обучение,
              аналитика, кейсы и инструменты для системной работы на рынке.
            </p>
          </article>

          <FooterNavColumn title="Навигация" items={footerNavItems} className="footer-nav-column" />
          <FooterNavColumn title="Пользователю" items={footerUserItems} className="footer-user-column" />

          <article className="footer-card footer-contacts">
            <h3>Контакты</h3>
            <ul className="footer-contact-list">
              {footerContactItems.map(({ label, value, href, Icon, tone }) => (
                <li key={label}>
                  <span className={`footer-contact-icon footer-contact-icon-${tone}`} aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <span className="footer-contact-label">{label}</span>
                    {href ? (
                      <a href={href} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noreferrer" : undefined}>
                        {value}
                      </a>
                    ) : (
                      <span className="footer-contact-value">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="footer-legal">
          <span>© 2025 ООО «ЛИОН МЕДИА»</span>
          <span>ИНН 7725363413</span>
          <span>ОГРН 1177746287212</span>
          <a href="#top">Пользовательское соглашение</a>
          <a href="#top">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}

function FooterNavColumn({
  title,
  items,
  className = ""
}: {
  title: string;
  items: readonly { label: string; href: string; opensAccessModal?: boolean }[];
  className?: string;
}) {
  return (
    <nav className={`footer-column ${className}`} aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            {item.opensAccessModal ? (
              <button type="button" onClick={openAccessModal}>
                {item.label}
              </button>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
