import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Calculator,
  Car,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  Gavel,
  LockKeyhole,
  MessageCircle,
  Percent,
  Play,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Wrench
} from "lucide-react";
import { images } from "./constants";
import {
  accessBadges,
  caseRows,
  chatMessages,
  communityPills,
  dealSteps,
  economicsCards,
  footerNavigation,
  footerUserLinks,
  heroBenefits,
  heroTrust,
  lotReviewPills,
  mistakes,
  modules
} from "./data";
import { Card, GlowButton, IconBox, Logo, MetricCard, Reveal, SectionEyebrow } from "./components/ui";

const benefitIcons = [ShieldCheck, BarChart3, Users];
const metricIcons = [BarChart3, Users, Wallet];
const economicsIcons = [TrendingUp, Percent, Gauge, BarChart3];
const stepIcons = [Search, ShieldCheck, Wrench, Gavel, ClipboardList, TrendingUp];
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
            <p className="mt-7 max-w-[650px] text-xl leading-[1.58] text-white/72 md:text-[22px]">
              Поймите механику рынка, научитесь оценивать лоты, избегать ошибок и зарабатывать на
              перепродаже автомобилей с аукционов.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-11 grid gap-5 sm:grid-cols-3">
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
            <div className="mt-14 flex flex-col gap-5 sm:flex-row">
              <GlowButton href="#access" className="min-h-[68px] px-8 text-[17px]">
                Получить доступ бесплатно <ArrowRight className="ml-3 h-5 w-5" />
              </GlowButton>
              <GlowButton href="#case" variant="secondary" className="min-h-[68px] px-8 text-[17px]">
                <Play className="mr-3 h-5 w-5 fill-red text-red" /> Смотреть кейсы
              </GlowButton>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[15px] text-white/70">
              {heroTrust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="hero-metrics">
          <MetricCard
            Icon={metricIcons[0]}
            label="Средняя прибыль на сделку"
            value="+312 780 ₽"
            className="hero-metric hero-metric-top"
          />
          <MetricCard
            Icon={metricIcons[1]}
            label="Успешных учеников"
            value="2 847"
            caption="по всей России"
            tone="red"
            className="hero-metric hero-metric-users"
          />
          <MetricCard
            Icon={metricIcons[2]}
            label="ROI за 30 дней"
            value="+28,4%"
            className="hero-metric hero-metric-roi"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function MarketEconomics() {
  return (
    <section id="economy" className="page-section">
      <div className="section-container">
        <Reveal>
          <div className="max-w-[760px]">
            <SectionEyebrow>Экономика рынка</SectionEyebrow>
            <h2 className="section-title">Почему на этом зарабатывают?</h2>
            <p className="section-subtitle">
              Доход появляется из дисциплины: цена входа, оценка ремонта, контроль ставки и понимание
              ликвидности.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {economicsCards.map((card, index) => {
            const Icon = economicsIcons[index];
            const tone = card.tone === "green" ? "green" : "red";

            return (
              <Reveal key={card.number} delay={index * 0.05}>
                <Card as="article" className="economy-card">
                  <div className="mb-16 flex flex-row-reverse items-start justify-between">
                    <IconBox Icon={Icon} tone={tone} />
                    <span className="text-3xl font-black text-white/38">{card.number}</span>
                  </div>
                  <h3>{card.title}</h3>
                  {card.value ? <strong className={tone === "green" ? "text-green" : "text-red"}>{card.value}</strong> : null}
                  <span className="card-divider" />
                  <p>{card.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DealMechanics() {
  return (
    <section id="mechanics" className="page-section mechanics-section">
      <div className="section-container grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <div className="relative max-w-[710px]">
            <SectionEyebrow>Механика сделки</SectionEyebrow>
            <h2 className="section-title">Как работает рынок</h2>
            <p className="section-subtitle">
              Не теория, а пошаговая механика сделки: от выбора лота до фиксации прибыли.
            </p>
            <GlowButton href="#case" className="mt-10 min-h-[70px] px-9 text-lg">
              Посмотреть кейс <ArrowRight className="ml-3 h-5 w-5" />
            </GlowButton>
          </div>
        </Reveal>

        <div className="timeline">
          {dealSteps.map((step, index) => {
            const Icon = stepIcons[index];
            const tone = step.tone === "green" ? "green" : "red";

            return (
              <Reveal key={step.number} delay={index * 0.04}>
                <article className={`timeline-card ${tone === "green" ? "timeline-card-green" : ""}`}>
                  <span className="timeline-number">{step.number}</span>
                  <IconBox Icon={Icon} tone={tone} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
