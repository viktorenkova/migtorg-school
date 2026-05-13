import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  Car,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChartNoAxesCombined,
  ClipboardList,
  Gavel,
  LockKeyhole,
  Play,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
  X
} from "lucide-react";
import { images } from "./constants";
import {
  accessBadges,
  caseRows,
  chatMessages,
  communityPills,
  footerNavigation,
  footerUserLinks,
  heroBenefits,
  heroTrust,
  lotReviewPills,
  mistakes,
  modules
} from "./data";
import { GlowButton, IconBox, Logo, Reveal, SectionEyebrow } from "./components/ui";

const benefitIcons = [ShieldCheck, BarChart3, Users];
const moduleIcons = [Car, Calculator, Gavel, Wrench, ShieldCheck, Wallet, AlertTriangle, TrendingUp];

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
              <GlowButton href="#access" className="min-h-[68px] px-8 text-[17px]">
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
              Большинство новичков теряют деньги
              <br />
              не из-за рынка, а из-за отсутствия системы
            </h2>
            <div className="actuality-text">
              <p>
                Автомобильные аукционы открывают доступ к интересным лотам. Но без понимания механики торгов, оценки
                повреждений, расчета ставки и юридической проверки можно быстро уйти в минус.
              </p>
              <p>
                Новички часто думают, что достаточно просто “купить дешевле рынка”. На практике прибыль появляется только
                там, где есть расчет, дисциплина и понятный план сделки.
              </p>
            </div>
            <article className="actuality-conclusion">
              <ShieldCheck aria-hidden="true" />
              <span />
              <strong>Migtorg PRO помогает пройти этот путь не вслепую, а по понятной системе.</strong>
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
  const audienceCards = [
    {
      number: "01",
      title: "Для новичков",
      text: "Поймете, как работает аукцион, где искать первые лоты и почему выигрыш не всегда означает передачу автомобиля.",
      icon: (
        <>
          <CarFront className="pro-audience-main-icon" />
          <Search className="pro-audience-accent-icon" />
        </>
      )
    },
    {
      number: "02",
      title: "Для перекупов",
      text: "Научитесь использовать аукцион как дополнительный источник автомобилей и формировать собственную воронку сделок.",
      icon: (
        <>
          <RefreshCw className="pro-audience-main-icon pro-audience-main-icon-green" />
          <Car className="pro-audience-accent-icon pro-audience-accent-icon-white" />
        </>
      )
    },
    {
      number: "03",
      title: "Для автоподборщиков и СТО",
      text: "Сможете находить новые возможности для клиентов, ремонта, восстановления и перепродажи.",
      icon: (
        <>
          <ClipboardList className="pro-audience-main-icon" />
          <Wrench className="pro-audience-accent-icon pro-audience-accent-icon-red" />
        </>
      )
    },
    {
      number: "04",
      title: "Для предпринимателей",
      text: "Разберете модель работы с ГОТС и ТС как отдельное направление бизнеса.",
      icon: (
        <>
          <BriefcaseBusiness className="pro-audience-main-icon" />
          <ChartNoAxesCombined className="pro-audience-accent-icon pro-audience-accent-icon-red" />
        </>
      )
    }
  ];

  return (
    <section id="mechanics" className="page-section migtorg-pro-section">
      <div className="section-container migtorg-pro-container">
        <div className="migtorg-pro-top">
          <Reveal>
            <div className="migtorg-pro-copy">
              <SectionEyebrow>Что такое Migtorg PRO</SectionEyebrow>
              <h2 className="section-title migtorg-pro-title">
                Migtorg PRO — это не курс про “успешный успех”.
                <br />
                Это <span>практическая школа</span> работы с автоаукционами
              </h2>
              <div className="migtorg-pro-text">
                <p>Мы не обещаем гарантированную прибыль и не говорим, что каждый лот принесет деньги.</p>
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

        <div className="migtorg-pro-audience-grid">
          {audienceCards.map((card, index) => (
            <Reveal key={card.number} delay={index * 0.05}>
              <article className="pro-audience-card">
                <span className="pro-audience-number">{card.number}</span>
                <span className="pro-audience-icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3>{card.title}</h3>
                <span className="pro-audience-mark" aria-hidden="true" />
                <p>{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudy() {
  return (
    <section id="case" className="page-section">
      <div className="section-container">
        <Reveal>
          <div className="max-w-[860px]">
            <SectionEyebrow>Реальный кейс</SectionEyebrow>
            <h2 className="section-title">Сделка видна в цифрах</h2>
            <p className="section-subtitle">
              Вместо обещаний — понятная калькуляция: покупка, ремонт, расходы, продажа и чистая прибыль.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="case-panel">
            <div className="case-image">
              <img src={images.caseBmw} alt="BMW X5 2020 на площадке автомобильного аукциона" />
              <span className="case-badge">РЕАЛЬНЫЙ КЕЙС</span>
              <span className="case-name">BMW X5 2020</span>
            </div>
            <div className="case-table">
              <p>Лот 25837405</p>
              <strong>28 дней</strong>
              <span>от покупки до продажи</span>
              <dl>
                {caseRows.map(([name, value]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="profit-card">
              <p>Чистая прибыль</p>
              <strong>230 000 ₽</strong>
              <span>Сделка разобрана по шагам: ставка, восстановление, документы и продажа.</span>
              <GlowButton href="#access" className="mt-auto w-full">
                Разобраться в механике
              </GlowButton>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function ProgramModules() {
  const [active, setActive] = useState(1);

  return (
    <section id="program" className="page-section program-section">
      <div className="section-container grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal>
          <div className="max-w-[620px]">
            <SectionEyebrow>Что внутри школы</SectionEyebrow>
            <h2 className="section-title">
              8 модулей для
              <br />
              системного входа
              <br />в рынок
            </h2>
            <p className="section-subtitle">
              Пошаговая программа, которая помогает разобраться в рынке, считать риски и принимать решения
              как профессионал.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="accordion-list">
            {modules.map((item, index) => {
              const Icon = moduleIcons[index];
              const isActive = active === index;

              return (
                <motion.article key={item.title} layout className={`accordion-item ${isActive ? "is-active" : ""}`}>
                  <button type="button" onClick={() => setActive(index)} aria-expanded={isActive}>
                    <IconBox Icon={Icon} />
                    <span>{index + 1}.</span>
                    <strong>{item.title}</strong>
                    <ChevronDown className="ml-auto h-6 w-6" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <p>{item.text}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LiveLotReview() {
  return (
    <section id="reviews" className="page-section review-section">
      <div className="section-container grid gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <Reveal>
          <article className="video-card">
            <div className="video-top">
              <span className="status-dot" />
              <strong>Разбор лота в прямом эфире</strong>
              <time>02:47</time>
            </div>
            <div className="video-body">
              <img src={images.caseBmw} alt="BMW X5 2020 для разбора лота в прямом эфире" />
              <div className="lot-info">
                <h3>BMW X5 2020</h3>
                <span><ShieldCheck className="h-6 w-6 text-green" /> VIN проверен</span>
                <span><Wrench className="h-6 w-6 text-red" /> Ремонт: 210 000 ₽</span>
                <span><Target className="h-6 w-6 text-red" /> Предел ставки: <b>1 740 000 ₽</b></span>
              </div>
            </div>
            <div className="current-bid">
              <span>Текущая ставка</span>
              <strong>1 580 000 ₽</strong>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <SectionEyebrow>Разборы лотов</SectionEyebrow>
            <h2 className="section-title">
              Внутрянка рынка
              <br />в реальном времени
            </h2>
            <p className="section-subtitle">
              Эксперт открывает аукцион и показывает: почему берем, почему пропускаем, сколько можно
              заработать и где риск.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {lotReviewPills.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
            <GlowButton href="#case" variant="outline" className="mt-9 min-h-[74px] px-10 text-xl">
              <Play className="mr-4 h-5 w-5" /> Посмотреть разбор
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Mistakes() {
  return (
    <section className="page-section mistakes-section">
      <div className="section-container grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <Reveal>
          <div className="max-w-[610px]">
            <SectionEyebrow>Ошибки новичков</SectionEyebrow>
            <h2 className="section-title">
              Что съедает
              <br />
              прибыль
            </h2>
            <p className="section-subtitle">
              Большинство потерь происходит не из-за рынка, а из-за ошибок в проверке истории, расчёте
              ремонта, выборе аукциона и стратегии ставок.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {mistakes.map((mistake, index) => (
            <Reveal key={mistake} delay={index * 0.04}>
              <article className="alert-card">
                <IconBox Icon={AlertTriangle} />
                <strong>{mistake}</strong>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" className="page-section community-section">
      <div className="section-container grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <Reveal>
          <div className="max-w-[670px]">
            <SectionEyebrow>Сообщество</SectionEyebrow>
            <h2 className="section-title">
              Закрытая среда
              <br />
              участников рынка
            </h2>
            <p className="section-subtitle">
              После обучения участник попадает в профессиональный контекст: сделки, обсуждения, помощь,
              разборы лотов и партнерства.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              {communityPills.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="chat-panel">
            {chatMessages.map((message) => (
              <article key={message.author} className={`chat-card ${message.tone === "green" ? "chat-card-green" : ""}`}>
                <span className="avatar">{message.tone === "green" ? <Users className="h-8 w-8" /> : message.author === "Команда Migtorg" ? "M" : "PRO"}</span>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <strong>{message.author}</strong>
                    <time>{message.time}</time>
                  </div>
                  <p>{message.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="access" className="page-section final-cta-section">
      <div className="section-container grid gap-16 lg:grid-cols-[0.96fr_0.78fr] lg:items-center">
        <Reveal>
          <div className="relative z-10 max-w-[760px]">
            <SectionEyebrow>Доступ к школе</SectionEyebrow>
            <h2 className="section-title">
              Получите доступ
              <br />
              к механике рынка,
              <br />
              на котором работают
              <br />
              профессионалы
            </h2>
            <p className="section-subtitle">
              Бесплатная школа Migtorg PRO поможет понять, как устроены автомобильные аукционы и как
              зарабатывать на них системно.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              {accessBadges.map((badge) => (
                <span key={badge} className="pill pill-green">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="access-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Имя</span>
              <input type="text" name="name" placeholder="Ваше имя" autoComplete="name" required />
            </label>
            <label>
              <span>Телефон или email</span>
              <input type="text" name="contact" placeholder="+7 или email" autoComplete="email" required />
            </label>
            <GlowButton type="submit" className="min-h-[92px] w-full text-[clamp(18px,2.2vw,28px)]">
              Получить доступ бесплатно
            </GlowButton>
            <p>Данные нужны только для отправки доступа.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <Logo small />
          <p className="max-w-[560px] text-xl leading-snug text-white/50 lg:text-center">
            Автомобильные аукционы под контролем. Аналитика, финансы и результат.
          </p>
          <a href="#top" className="back-top">
            ↑ Наверх
          </a>
        </div>

        <div className="grid gap-9 py-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1.25fr]">
          <div>
            <h3>О проекте</h3>
            <p>
              Migtorg PRO — школа автомобильных аукционов для новичков и профессионалов. Обучение,
              аналитика, кейсы и инструменты для системной работы на рынке.
            </p>
          </div>
          <FooterColumn title="Навигация" items={footerNavigation} />
          <FooterColumn title="Пользователю" items={footerUserLinks} />
          <div>
            <h3>Контакты</h3>
            <p>
              Телефон: +7 (495) 649 91 99
              <br />
              WhatsApp: +7 (926) 511 43 99
              <br />
              E-mail: school@migtorg.com
              <br />
              Адрес: 109 052, г. Москва, ул. Смирновская, д. 25, стр. 16, подъезд 2, 4 этаж
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-7 text-sm font-semibold text-white/38">
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

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <a href={item.includes("Доступ") || item.includes("Получить") ? "#access" : "#top"}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
