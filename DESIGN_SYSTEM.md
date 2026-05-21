# Migtorg PRO Design System

Версия: 1.0  
Назначение: технический визуальный контракт для редизайна лендинга Migtorg PRO.  
Основа: бриф сайта Migtorg PRO и 9 эталонных экранов `эталонный визуал/1.png` ... `9.png`.

## 1. Визуальный Стиль

Migtorg PRO использует темный fintech / auction dashboard стиль с высокой визуальной плотностью, крупной типографикой, стеклянными поверхностями и дозированными красно-зелеными сигналами.

Технические признаки стиля:

- Базовый фон: почти черный `#050A12` с переходами в deep navy `#08111D` и graphite `#0B1018`.
- Основные поверхности: темные glass-панели `rgba(15, 23, 42, 0.72)` с blur `18px-26px`, тонкой светлой обводкой и внутренним highlight.
- Красный цвет отвечает за бренд, CTA, риск, активную навигацию, warning, timeline до продажи.
- Зеленый цвет используется только для прибыли, ROI, успешной сделки, положительной метрики и финального шага timeline.
- Заголовки крупные, жирные, плотные: без декоративных шрифтов, без narrow/condensed.
- Визуальная глубина строится слоями: dark base -> radial glow -> glass surface -> icon/card glow -> text.
- UI должен выглядеть как продуктовая аналитическая среда автомобильных аукционов, а не как инфокурс, SaaS dashboard или крипто-лендинг.

## 2. Цветовые Токены

### Base

```css
--bg-950: #050A12;
--bg-900: #08111D;
--bg-850: #0B1018;
--bg-800: #101722;
--bg-750: #141C28;

--white: #F8FAFC;
--text-primary: #F8FAFC;
--text-secondary: rgba(248, 250, 252, 0.74);
--text-muted: #9CA3AF;
--text-soft: rgba(248, 250, 252, 0.48);

--stroke-soft: rgba(255, 255, 255, 0.08);
--stroke: rgba(255, 255, 255, 0.12);
--stroke-strong: rgba(255, 255, 255, 0.22);
```

### Brand / Status

```css
--red: #FF5148;
--red-600: #E9433C;
--red-dark: #B92825;
--red-soft: rgba(255, 81, 72, 0.12);
--red-stroke: rgba(255, 81, 72, 0.48);
--red-glow: rgba(255, 81, 72, 0.34);

--green: #55E66B;
--green-600: #35C95B;
--green-soft: rgba(85, 230, 107, 0.12);
--green-stroke: rgba(85, 230, 107, 0.42);
--green-glow: rgba(85, 230, 107, 0.30);
```

### Surfaces

```css
--card: rgba(15, 23, 42, 0.72);
--card-strong: rgba(15, 23, 42, 0.86);
--card-soft: rgba(15, 23, 42, 0.56);
--glass-highlight: rgba(255, 255, 255, 0.08);
--input-bg: rgba(5, 12, 21, 0.70);
--nav-bg: rgba(5, 10, 18, 0.76);
```

### Gradients

```css
--gradient-red-button: linear-gradient(135deg, #FF6B62 0%, #FF5148 48%, #DD2E2B 100%);
--gradient-green-text: linear-gradient(135deg, #7CFF92 0%, #27D65C 56%, #B2FF78 100%);
--gradient-card-glass: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.018));
--gradient-profit-card: radial-gradient(circle at 44% 23%, rgba(85,230,107,0.22), transparent 39%), rgba(8,51,32,0.45);
```

## 3. Типографика

Шрифты:

- Заголовки: `Manrope`, fallback `Inter`, `Segoe UI`, `system-ui`.
- Текст и UI: `Inter`, fallback `Manrope`, `Segoe UI`, `system-ui`.
- Letter spacing: `0` для заголовков и текста; eyebrow допускает `0.16em`.

### Desktop ≥ 1200px

| Role | Size | Line-height | Weight | Notes |
|---|---:|---:|---:|---|
| Hero H1 | `78px` | `1.06` | `900` | max-width `700px`; слово-акцент зеленым градиентом |
| Section H2 XL | `72px` | `1.06` | `900` | для ключевых секций |
| Section H2 | `64px` | `1.08` | `900` | стандарт |
| H3 Card | `26px-30px` | `1.16` | `800` | карточки и timeline |
| Body Lead | `22px-25px` | `1.5` | `400` | intro секции |
| Body | `18px-20px` | `1.48` | `400` | карточки |
| UI Button | `16px-18px` | `1.1` | `800` | CTA |
| Eyebrow | `16px-18px` | `1` | `800` | uppercase |

### Tablet 768px-1199px

| Role | Size | Line-height | Weight |
|---|---:|---:|---:|
| Hero H1 | `56px-64px` | `1.06` | `900` |
| Section H2 | `48px-58px` | `1.08` | `900` |
| H3 Card | `23px-26px` | `1.18` | `800` |
| Body Lead | `19px-22px` | `1.52` | `400` |
| Body | `17px-19px` | `1.5` | `400` |
| UI Button | `15px-17px` | `1.1` | `800` |

### Mobile ≤ 767px

| Role | Size | Line-height | Weight |
|---|---:|---:|---:|
| Hero H1 | `42px-48px` | `1.06` | `900` |
| Section H2 | `38px-44px` | `1.08` | `900` |
| H3 Card | `20px-24px` | `1.2` | `800` |
| Body Lead | `17px-19px` | `1.55` | `400` |
| Body | `16px-17px` | `1.5` | `400` |
| UI Button | `15px-16px` | `1.15` | `800` |

## 4. Сетка

### Breakpoints

```css
--bp-mobile: 0;
--bp-tablet: 768px;
--bp-desktop: 1200px;
--bp-wide: 1440px;
```

### Container

- Desktop: `max-width: 1440px`, width `calc(100% - 96px)`.
- Tablet: width `calc(100% - 56px)`.
- Mobile: width `calc(100% - 28px)`.
- Wide desktop content remains capped at `1440px`; decorative background can extend full viewport.

### Columns

- Desktop: 12 columns, gutter `28px`.
- Tablet: 8 columns, gutter `22px`.
- Mobile: 4 columns, gutter `16px`.

### Common Layouts

- Hero desktop: `grid-template-columns: 0.88fr 1.12fr`, gap `40px-64px`.
- Two-column content sections: `0.9fr 1.1fr` or `1.08fr 0.92fr`, gap `56px-72px`.
- Economy cards desktop: 4 columns, gap `28px`.
- Cards tablet: 2 columns, gap `20px-24px`.
- Cards mobile: 1 column, gap `16px`.

## 5. Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 28px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-28: 112px;
--space-32: 128px;
--space-40: 160px;
```

Section paddings:

- Desktop: `112px-150px` vertical.
- Hero desktop: `min-height: 860px`, top content offset `120px-150px`.
- Tablet: `88px-120px` vertical.
- Mobile: `72px-92px` vertical.

Internal spacing:

- Eyebrow to H2: `22px-28px`.
- H2 to subtitle: `24px-30px`.
- Section heading to content grid: `48px-64px`.
- Card internal padding desktop: `28px-36px`.
- Card internal padding mobile: `20px-24px`.

## 6. Правила Карточек

### Base Glass Card

```css
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 22px;
background:
  linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.018)),
  rgba(15, 23, 42, 0.72);
box-shadow:
  0 28px 90px rgba(0, 0, 0, 0.35),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);
backdrop-filter: blur(22px);
```

Card sizes:

- Economy card desktop: min-height `430px-460px`, padding `30px`.
- Timeline card desktop: min-height `118px`, radius `18px-20px`, padding `22px 30px`.
- Case wrapper: radius `26px-28px`, padding `24px-28px`.
- Profit card: min-height `420px`, padding `34px`, green stroke.
- Form card: radius `30px-32px`, padding `48px-56px`.
- Chat panel outer: radius `32px-34px`, padding `44px-54px`.

Hover:

```css
transform: translateY(-4px);
border-color: rgba(255, 81, 72, 0.42);
box-shadow:
  0 34px 92px rgba(0,0,0,0.42),
  0 0 32px rgba(255,81,72,0.12),
  inset 0 1px 0 rgba(255,255,255,0.10);
transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
```

Profit / positive cards:

```css
border-color: rgba(85, 230, 107, 0.45);
background:
  radial-gradient(circle at 44% 23%, rgba(85,230,107,0.22), transparent 39%),
  rgba(8, 51, 32, 0.45);
box-shadow:
  0 0 48px rgba(85,230,107,0.12),
  inset 0 1px 0 rgba(255,255,255,0.09);
```

## 7. Правила Glow

Glow используется как функциональный акцент, а не как общий фон каждого элемента.

### Red CTA Glow

```css
box-shadow:
  0 22px 56px rgba(255, 81, 72, 0.30),
  0 0 32px rgba(255, 81, 72, 0.20),
  inset 0 1px 0 rgba(255, 255, 255, 0.20);
```

Hover:

```css
box-shadow:
  0 26px 68px rgba(255, 81, 72, 0.42),
  0 0 46px rgba(255, 81, 72, 0.27),
  inset 0 1px 0 rgba(255, 255, 255, 0.26);
```

### Green Metric Glow

```css
text-shadow: 0 0 28px rgba(85, 230, 107, 0.26);
filter: drop-shadow(0 0 10px rgba(85, 230, 107, 0.45));
```

### Section Edge Glow

Разрешены только крупные рассеянные пятна:

```css
background:
  radial-gradient(ellipse at 92% 42%, rgba(255,81,72,0.17), transparent 28%),
  radial-gradient(ellipse at 4% 85%, rgba(255,81,72,0.08), transparent 24%);
```

Ограничение:

- Не более 2 glow-источников на секцию.
- Непрозрачность красного glow не выше `0.28`.
- Зеленый glow только рядом с profit/ROI/positive metric.
- Glow не должен ухудшать читаемость текста: контраст текста к фону минимум `4.5:1`.

## 8. Правила Фонов

Base page:

```css
background:
  radial-gradient(circle at 92% 10%, rgba(255,81,72,0.20), transparent 28%),
  radial-gradient(circle at 4% 76%, rgba(255,81,72,0.14), transparent 27%),
  linear-gradient(135deg, #03070C 0%, #07101C 42%, #090F19 100%);
```

Допустимые фоновые слои:

- Deep navy gradient.
- Красное рассеянное свечение справа или снизу.
- Очень тонкая grid/noise texture с opacity `0.03-0.08`.
- Автомобильный силуэт или фото только если оно не конкурирует с контентом; opacity `0.16-0.35`, mask/gradient затемнение обязательно.

Запрещено:

- Светлые секции.
- Белые/серые фоновые блоки.
- Синие SaaS-градиенты.
- Цветные decorative blobs.
- Фоны с людьми, офисами, stock business imagery.

## 9. Правила Кнопок

### Primary CTA

```css
min-height: 64px;
padding: 0 32px;
border: 1px solid transparent;
border-radius: 12px;
background: linear-gradient(135deg, #FF6B62 0%, #FF5148 48%, #DD2E2B 100%);
color: #FFFFFF;
font-size: 17px;
font-weight: 850;
line-height: 1.1;
```

Desktop large CTA:

- Height `68px-74px`.
- Padding `0 36px`.
- Icon gap `12px`.

Final form CTA:

- Height `88px-92px`.
- Font size `24px-28px` desktop, `18px-20px` mobile.

### Secondary / Outline CTA

```css
min-height: 64px;
padding: 0 30px;
border: 1px solid rgba(255,255,255,0.14);
border-radius: 12px;
background: rgba(255,255,255,0.035);
color: #F8FAFC;
backdrop-filter: blur(18px);
```

Outline red:

```css
border-color: rgba(255, 81, 72, 0.72);
background: rgba(255,255,255,0.025);
```

Mobile:

- Buttons full width except header CTA.
- Min-height `52px-58px`.
- Radius `10px-12px`.

## 10. Правила Секций

### Logo

Эталонный логотип для всех страниц проекта — общий компонент `Logo` из `src/components/ui.tsx`. Новые страницы должны использовать этот компонент без локального пересоздания разметки или альтернативного визуального стиля.

Структура:

```tsx
<a className="logo" aria-label="MIG TORG PRO">
  <span className="logo-mig">MIG</span>
  <span className="logo-torg">
    <span className="logo-torg-text">TORG</span>
    <span className="logo-dot" />
  </span>
  <span className="logo-pro">PRO</span>
</a>
```

Визуальные правила:

- `MIG` — белый текст, weight `950`, размер `clamp(24px, 1.95vw, 31px)`.
- `TORG` — красная стрелочная плашка: `linear-gradient(135deg, #ff6b62, #ff5148 58%, #d62e2b)`, `clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)`, внутренний темный inset-слой `rgba(7, 12, 20, 0.94)`.
- Белая точка внутри `TORG` — `4px`, справа `clamp(15px, 1.25vw, 20px)`, с мягким белым glow.
- `PRO` — темная компактная плашка с border `rgba(255,255,255,0.2)`, radius `7px`, weight `950`, размер `clamp(13px, 1vw, 15px)`.
- Gap между частями логотипа: `7px` desktop/tablet, `5px` mobile.
- Mobile `≤ 767px`: `MIG`/`TORG` `21px`, `TORG` min-height `34px`, `PRO` min-height `28px`, `PRO` font-size `12px`.
- Этот вид является единым для header, footer, auth и learning pages; контекстные классы могут менять только позиционирование контейнера, но не оформление частей логотипа.
- На страницах обучения (`/learn`, страницы модулей и уроков) `LearnLayout` обязан использовать тот же `Logo` без замены на текстовый, SVG, bitmap или локально сверстанный вариант. Если нужен другой размер контейнера, меняется только обертка `.learn-header`, а классы `.logo`, `.logo-mig`, `.logo-torg`, `.logo-dot`, `.logo-pro` сохраняют эталонное оформление.

### Header

- Position: `fixed` or `sticky`.
- Top offset desktop: `16px-24px`; mobile: `8px-12px`.
- Container max: `1540px` allowed for nav only.
- Height desktop: `78px`.
- Radius: `24px`.
- Background: `rgba(5,10,18,0.76)`.
- Border: `1px solid rgba(255,255,255,0.12)`.
- Blur: `backdrop-filter: blur(24px)`.
- Logo left, nav center, CTA right.
- Mobile: logo + CTA + burger; mobile menu glass panel below header.

### Hero

- Min-height desktop: `900px-100svh`.
- Layout: left content `~45%`, right laptop/mockup `~55%`.
- H1 max-width: `700px`.
- Hero laptop width: `900px-980px`, positioned right; can overflow container by `0-8vw`.
- Floating metric cards: width `280px-320px`, height `120px-145px`, radius `20px-22px`.
- Hero benefits: 3 items, icon box `54px-58px`, gap `24px-36px`.

### Market / Economy

- Heading block max-width `760px`.
- Cards grid: 4 columns desktop.
- Card number top-left, icon top-right.
- Red divider line width `34px`, height `2px`.
- Cards must align top and bottom; no masonry.

### Deal Mechanics

- Two columns desktop.
- Timeline line width `3px`.
- Timeline number circle `58px`, border `2px`, outer glow ring `8px`.
- Step card grid: `58px 1fr`, gap `24px`.
- Last step green; previous steps red.

### Case Study

- Outer case panel: grid 3 columns desktop.
- Left image column min-height `420px`.
- Center table border rows.
- Profit card green, visually stronger than neutral table but not brighter than CTA.
- Image must be actual car/auction imagery or a replaceable dark automotive image with the same ratio.

### Program Modules

- Desktop: left copy `~40%`, right accordion `~60%`.
- Accordion item min-height collapsed `76px-88px`.
- Active item contains content with top separator `1px solid rgba(255,255,255,0.12)`.
- Icon boxes `58px`.
- Chevron rotates `180deg`.

### Live Lot Review

- Desktop: video card left `~55%`, copy/actions right `~45%`.
- Video card outer radius `28px`.
- Inner image/info grid: `1.16fr 0.84fr`.
- Current bid row full-width bottom; green border and green value.
- Pills: 2-column grid desktop/tablet, 1-column on small mobile if needed.

### Mistakes

- Desktop: left copy `~40%`, right alert list `~60%`.
- Alert card min-height `118px`.
- Warning icon circle `72px-76px`.
- Red border/glow is allowed but no green.

### Community

- Desktop: left copy `~45%`, chat panel `~55%`.
- Chat panel radius `34px`.
- Chat cards: grid `82px 1fr`, gap `28px`, padding `28px`.
- Red messages for expert/team, green message for participant.

### Final CTA / Footer

- Final CTA desktop: copy left, form right.
- Form card width target `520px-580px`.
- Inputs min-height `76px-78px`, radius `12px-13px`.
- Footer top row: logo, center statement, back-top link.
- Footer columns: 4 columns desktop, 2 tablet, 1 mobile.

## 11. Запреты

Запрещено:

- Использовать белый или светло-серый фон секций.
- Использовать Bootstrap-like синие кнопки, default shadows или default cards.
- Использовать stock business people, офисные фото, рукопожатия, инфобизнес-образы.
- Использовать зеленый для CTA, warning, навигации или декоративных элементов без смысла прибыли.
- Использовать красный для положительной прибыли/ROI.
- Делать glow вокруг каждого элемента; glow должен быть дозированным.
- Делать карточки без blur/обводки в финальном визуальном стиле.
- Использовать border-radius меньше `10px` для финального UI, кроме технических мелких линий.
- Использовать negative letter-spacing.
- Использовать viewport-based font-size через `vw` без clamp.
- Ставить текст поверх активного glow без затемняющего слоя.
- Делать hero без реального product/auction/car визуала.
- Перегружать секции случайными dashboard-виджетами, которых нет в брифе.
- Менять порядок смысловых секций.
- Удалять русские тексты, CTA, форму или nav anchors.

## 12. Критерии Визуальной Приёмки

### Global

- На desktop ширина контента не превышает `1440px`, кроме header `1540px` и декоративных фоновых слоев.
- Нет горизонтального скролла при `390px`, `768px`, `1440px`.
- Все секции имеют вертикальный rhythm: `72px+` mobile, `112px+` desktop.
- Все интерактивные элементы имеют visible focus state.
- Контраст основного текста к фону минимум `4.5:1`.
- Контраст secondary text к фону минимум `3:1`.

### Reference Match

- Экран 1: hero должен иметь glass header, крупный H1 слева, laptop/mockup справа, 3 floating metrics, красное свечение справа/снизу.
- Экран 2: economy cards должны быть 4 равными glass-карточками с номерами, крупными иконками и красно-зелеными статусами.
- Экран 3: mechanics должен иметь вертикальную timeline с номерными кругами и card row справа.
- Экран 4: case section должен иметь большую 3-колоночную карточку: фото, таблица, green profit panel.
- Экран 5: lot review должен иметь video-like card с bid row и правый текстовый блок с pills.
- Экран 6: modules должен иметь левый крупный текст и правый accordion, где активный пункт раскрыт.
- Экран 7: mistakes должен иметь 5 крупных alert cards с красными warning icons.
- Экран 8: community должен иметь chat panel с 3 сообщениями и цветовой разметкой ролей.
- Экран 9: final CTA должен иметь крупный заголовок слева и glass form справа.

### Component QA

- Header не перекрывает hero content на mobile; минимальный safe offset под header `88px`.
- Primary CTA hover не меняет layout и не вызывает shift.
- Card hover не меняет размеры сетки.
- Accordion раскрывается без скачка ширины и без горизонтального overflow.
- Case table на mobile складывается вертикально, значения не выходят за контейнер.
- Floating cards в hero не перекрывают H1, CTA и laptop screen.
- Glow не обрезается родителем, если это намеренный внешний эффект; если контейнер `overflow: hidden`, glow должен быть внутренним.

### Motion QA

- Fade-up: `opacity 0 -> 1`, `translateY(20px-28px -> 0)`, duration `520ms-680ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Stagger hero: delay step `60ms-90ms`.
- Laptop float: amplitude `8px-12px`, duration `6s-8s`, infinite, disabled with `prefers-reduced-motion`.
- Hover lift: `translateY(-4px)`, duration `180ms-220ms`.
- Accordion: height/opacity transition `260ms-320ms`.
- `prefers-reduced-motion: reduce` disables float, parallax, hover transform and long animations.

### Delivery Checklist

- `DESIGN_SYSTEM.md` is the source of visual truth before implementation.
- Any future CSS tokens must map to this document.
- New visual decisions require updating this document first.
- Screenshots must be checked at `1440x900`, `768x1024`, `390x844`.
- Final implementation must not include service notes, filler text, unused visual experiments or alternate style branches.
