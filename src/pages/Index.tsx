import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─────────────────────────────────────────────
   ВЕЛКОНС — Лендинг «Вступление в СРО»
   Версия 1.0 | Премиум-стиль, тёмная тема
───────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#how" },
  { label: "О компании", href: "#about" },
  { label: "Кейсы", href: "#cases" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const PROBLEMS = [
  {
    icon: "Clock",
    title: "Стройка стоит — допуска нет",
    text: "Без членства в СРО вы не можете легально вести строительные, проектные или изыскательские работы. Каждый день простоя — прямые убытки.",
  },
  {
    icon: "FileX",
    title: "Бюрократия съедает время",
    text: "Пакет документов, требования НОСТРОЙ и НОПРИЗ, проверки Ростехнадзора — без опыта оформление растягивается на месяцы.",
  },
  {
    icon: "AlertTriangle",
    title: "Риск отказа и штрафов",
    text: "Ошибка в документах — повторная подача, задержка контракта, штрафы и репутационные потери.",
  },
  {
    icon: "ShieldOff",
    title: "Нет поддержки после вступления",
    text: "Многие посредники исчезают после оформления. Ежегодные взносы, проверки — снова разбираться в одиночку.",
  },
];

const SERVICES = [
  {
    id: "01",
    title: "СРО в строительстве",
    subtitle: "НОСТРОЙ",
    desc: "Допуск к строительству, реконструкции и капремонту объектов. Внесение в реестр НОСТРОЙ под ключ.",
    features: ["Сбор и проверка документов", "Подача в СРО", "Внесение в реестр НОСТРОЙ", "Сопровождение 1 год"],
  },
  {
    id: "02",
    title: "СРО проектировщиков",
    subtitle: "НОПРИЗ",
    desc: "Членство в СРО для компаний, выполняющих инженерное проектирование любой сложности.",
    features: ["Полный пакет документов", "Подача в СРО НОПРИЗ", "Внесение в госреестр", "Поддержка при проверках"],
  },
  {
    id: "03",
    title: "СРО изыскателей",
    subtitle: "НОПРИЗ",
    desc: "Допуск к инженерным изысканиям: геодезия, геология, экология, гидрология.",
    features: ["Анализ требований", "Комплект документов", "Регистрация в НОПРИЗ", "Годовое сопровождение"],
  },
  {
    id: "04",
    title: "Ростехнадзор",
    subtitle: "Спецнадзор",
    desc: "Получение допусков, лицензий и разрешений Ростехнадзора для объектов повышенной опасности.",
    features: ["Опасные производственные объекты", "Подготовка к проверкам", "Представление интересов", "Консультации"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Консультация и анализ",
    text: "Разбираем вашу ситуацию за 30 минут. Определяем нужный вид СРО, список документов, сроки и стоимость. Без скрытых условий.",
    icon: "MessageSquare",
  },
  {
    num: "02",
    title: "Подготовка документов",
    text: "Берём на себя весь пакет: уставные документы, квалификационные требования, страхование. Проверяем каждую бумагу.",
    icon: "FileCheck",
  },
  {
    num: "03",
    title: "Подача и контроль",
    text: "Подаём документы в СРО, контролируем прохождение, устраняем замечания. Вы получаете свидетельство и запись в реестре.",
    icon: "Send",
  },
  {
    num: "04",
    title: "Сопровождение 1 год",
    text: "Помогаем с плановыми проверками, взносами и изменениями состава членства в течение 12 месяцев.",
    icon: "ShieldCheck",
  },
];

const STATS = [
  { value: "500+", label: "компаний вступили в СРО" },
  { value: "12", label: "лет на рынке" },
  { value: "3–7", label: "дней — средний срок оформления" },
  { value: "100%", label: "успешных дел" },
];

const CASES = [
  {
    company: "ООО «СтройГрупп»",
    type: "Строительство",
    result: "Вступление в НОСТРОЙ за 5 дней",
    text: "Компания получила подряд на 120 млн руб., но не имела допуска. Оформили членство в СРО, внесли в реестр и передали документы заказчику через 5 рабочих дней.",
    tag: "НОСТРОЙ",
  },
  {
    company: "АО «ПроектСервис»",
    type: "Проектирование",
    result: "Смена СРО без потери контрактов",
    text: "Клиент столкнулся с ненадёжной СРО и рисками исключения. Помогли оперативно сменить организацию, сохранить все действующие контракты и репутацию.",
    tag: "НОПРИЗ",
  },
  {
    company: "ИП Кузнецов А.В.",
    type: "Изыскания",
    result: "Первый допуск с нуля за 7 дней",
    text: "Индивидуальный предприниматель открыл изыскательскую компанию. Подобрали оптимальную СРО, подготовили документы и обеспечили вступление с первого раза.",
    tag: "НОПРИЗ",
  },
];

const FAQS = [
  {
    q: "Сколько стоит вступление в СРО?",
    a: "Стоимость зависит от вида СРО, региона и необходимых допусков. Мы подготовим индивидуальный расчёт после короткой консультации — оставьте заявку, и мы свяжемся с вами в течение часа.",
  },
  {
    q: "Как быстро можно оформить членство?",
    a: "В стандартных случаях — 3–7 рабочих дней. Срочное оформление (при готовом пакете документов) — от 1–2 дней. Точные сроки назовём после анализа вашей ситуации.",
  },
  {
    q: "Нужно ли лично приезжать в офис?",
    a: "Нет. Мы работаем по всей России дистанционно. Все документы передаются в электронном виде или курьером. Очное взаимодействие — только по вашему желанию.",
  },
  {
    q: "Что входит в сопровождение в течение года?",
    a: "Консультации по любым вопросам членства, помощь при плановых и внеплановых проверках СРО, уведомления о сроках взносов и изменениях законодательства.",
  },
  {
    q: "Что если СРО откажет в приёме?",
    a: "За 12 лет работы мы не получили ни одного окончательного отказа. Если возникают замечания — устраняем их за свой счёт и подаём повторно. Результат гарантирован.",
  },
];

// ── Хук плавного появления ──────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Хедер ─────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#070d1a]/96 backdrop-blur-lg shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        {/* Логотип */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a349] to-[#8b6b1e] flex items-center justify-center shadow-lg shadow-[#c9a349]/25">
            <span className="text-[#070d1a] font-bold text-sm tracking-wide">ВК</span>
          </div>
          <div className="leading-none">
            <div className="text-white font-display font-bold text-xl tracking-wider">ВЕЛКОНС</div>
            <div className="text-[#c9a349] text-[9px] tracking-[0.25em] uppercase mt-0.5">Допуски СРО</div>
          </div>
        </a>

        {/* Десктоп-навигация */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-white/60 hover:text-[#c9a349] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:84993502707"
            className="hidden md:flex items-center gap-1.5 text-[#c9a349] text-sm font-semibold hover:text-[#e0bc6a] transition-colors"
          >
            <Icon name="Phone" size={13} />
            8&nbsp;499&nbsp;350-27-07
          </a>
          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:block bg-gradient-to-r from-[#c9a349] to-[#a07830] text-[#070d1a] text-sm font-bold px-5 py-2.5 rounded-lg hover:from-[#e0bc6a] hover:to-[#c9a349] transition-all duration-300 shadow-lg shadow-[#c9a349]/20"
          >
            Получить допуск
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/70 hover:text-white p-1.5"
            aria-label="Открыть меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="lg:hidden bg-[#070d1a]/98 backdrop-blur-xl border-t border-white/8 px-5 py-5 space-y-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-3 px-2 text-white/70 hover:text-[#c9a349] text-base border-b border-white/5 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href="tel:84993502707" className="flex items-center gap-2 text-[#c9a349] font-semibold py-2">
              <Icon name="Phone" size={15} />
              8 499 350-27-07
            </a>
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-gradient-to-r from-[#c9a349] to-[#a07830] text-[#070d1a] font-bold py-3 rounded-lg mt-1"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Фото-фон */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/5482b3a7-18ef-4c69-a2c6-35a460e18019/files/49a84dda-5af5-46b9-b0f2-3815e74edcad.jpg)`,
        }}
      />
      {/* Градиентные оверлеи */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070d1a]/97 via-[#070d1a]/78 to-[#070d1a]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] via-transparent to-[#070d1a]/40" />

      {/* Декор */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#c9a349]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-32 bottom-32 w-[2px] bg-gradient-to-b from-transparent via-[#c9a349]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-36 pb-24">
        <div className="max-w-[680px]">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2.5 border border-[#c9a349]/30 bg-[#c9a349]/8 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a349] animate-pulse" />
            <span className="text-[#c9a349] text-[11px] font-semibold tracking-[0.18em] uppercase">
              Официальный партнёр НОСТРОЙ и НОПРИЗ
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-bold text-5xl md:text-[64px] lg:text-7xl text-white leading-[1.04] mb-7 tracking-tight">
            Допуск СРО{" "}
            <span
              className="relative inline-block"
              style={{
                backgroundImage: "linear-gradient(90deg, #c9a349, #f0d080, #c9a349)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              за&nbsp;3–7 дней
            </span>
            <br />
            под ключ
          </h1>

          <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-[580px]">
            Помогаем строительным, проектным и изыскательским компаниям вступить в СРО и получить допуск без волокиты. Внесение в НОСТРОЙ, НОПРИЗ, Ростехнадзор. Сопровождение в течение года включено.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a349] to-[#a07830] hover:from-[#e0bc6a] hover:to-[#c9a349] text-[#070d1a] font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-[#c9a349]/25 transition-all duration-300"
            >
              <Icon name="ArrowRight" size={18} />
              Получить бесплатную консультацию
            </button>
            <a
              href="tel:84993502707"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-[#c9a349]/60 text-white hover:text-[#c9a349] font-medium text-base px-6 py-4 rounded-xl transition-all duration-300"
            >
              <Icon name="Phone" size={17} />
              8 499 350-27-07
            </a>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[600px]">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-[#c9a349]">{s.value}</div>
                <div className="text-white/45 text-xs mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Скролл-индикатор */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#c9a349]" />
        <Icon name="ChevronDown" size={18} className="text-[#c9a349]" />
      </div>
    </section>
  );
}

// ── Проблема → Решение ────────────────────
function ProblemSection() {
  return (
    <section className="py-24 bg-[#070d1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_0%,rgba(201,163,73,0.06),transparent)]" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Почему это важно
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Знакомые ситуации?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Без членства в СРО компания не может участвовать в тендерах и вести строительную деятельность легально.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group bg-white/3 border border-white/8 hover:border-[#c9a349]/35 rounded-2xl p-7 transition-all duration-400">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a349]/10 group-hover:border-[#c9a349]/30 transition-all duration-300">
                    <Icon name={p.icon} size={20} className="text-red-400 group-hover:text-[#c9a349] transition-colors duration-300" fallback="AlertCircle" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Решение */}
        <Reveal>
          <div className="relative bg-gradient-to-br from-[#c9a349]/10 via-[#0d1629] to-[#0d1629] border border-[#c9a349]/25 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a349]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9a349] to-[#8b6b1e] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-[#c9a349]/30">
              <Icon name="ShieldCheck" size={34} className="text-[#070d1a]" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                ВЕЛКОНС берёт это на себя
              </h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                Мы оформляем допуск СРО полностью под ключ: собираем документы, подаём, контролируем результат и сопровождаем год. Вы продолжаете работать — мы решаем бюрократические вопросы.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Услуги ────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0a1220] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_100%,rgba(201,163,73,0.05),transparent)]" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Направления
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Наши услуги
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Полный спектр услуг по оформлению допусков для любого вида строительной деятельности
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <div className="group bg-white/3 border border-white/8 hover:border-[#c9a349]/40 rounded-2xl p-7 flex flex-col h-full hover:-translate-y-1 transition-all duration-400">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-5xl font-black text-white/6 group-hover:text-[#c9a349]/15 transition-colors">
                    {s.id}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase bg-[#c9a349]/10 text-[#c9a349] border border-[#c9a349]/20 px-3 py-1 rounded-full">
                    {s.subtitle}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a349] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-3 border border-[#c9a349]/25 hover:border-[#c9a349] hover:bg-[#c9a349]/8 text-[#c9a349] rounded-xl text-sm font-semibold transition-all duration-300"
                >
                  Узнать стоимость →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Как это работает ──────────────────────
function HowSection() {
  return (
    <section id="how" className="py-24 bg-[#070d1a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a349]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Процесс
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Как мы работаем
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Четыре шага от заявки до получения свидетельства СРО
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#c9a349]/10 border border-[#c9a349]/25 flex items-center justify-center group-hover:bg-[#c9a349]/20 group-hover:border-[#c9a349]/50 transition-all duration-400 shadow-lg shadow-[#c9a349]/8">
                    <Icon name={s.icon} size={26} className="text-[#c9a349]" fallback="CheckCircle" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#070d1a] border border-[#c9a349]/40 flex items-center justify-center">
                    <span className="text-[#c9a349] text-[10px] font-bold">{s.num}</span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-white/6 bg-white/2 py-8 px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
              {[
                { icon: "Award", text: "Гарантия результата или возврат средств" },
                { icon: "Clock", text: "Срочное оформление от 1 рабочего дня" },
                { icon: "Globe", text: "Работаем по всей России дистанционно" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <Icon name={item.icon} size={18} className="text-[#c9a349] flex-shrink-0" fallback="Check" />
                  <span className="text-white/65 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── О компании ────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a1220] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,163,73,0.04),transparent)]" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-6">
                О компании
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ВЕЛКОНС — ваш партнёр в сфере СРО
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-5">
                Более 12 лет мы помогаем строительным, проектным и изыскательским организациям своевременно получать допуски и успешно проходить проверки. Свыше 500 компаний по всей России доверили нам своё членство в СРО.
              </p>
              <p className="text-white/55 leading-relaxed mb-9">
                Услуги оказывает ИП Великоиваненко Сергей Васильевич — эксперт с профессиональными связями в ведущих СРО НОСТРОЙ и НОПРИЗ. Работаем по договору, несём юридическую ответственность за результат.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "MapPin", text: "115088, Москва, ул. Симоновский Вал 20 к 3" },
                  { icon: "Phone", text: "8 499 350-27-07", href: "tel:84993502707" },
                  { icon: "Mail", text: "info@wellcons.ru", href: "mailto:info@wellcons.ru" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon name={item.icon} size={15} className="text-[#c9a349] flex-shrink-0" fallback="Info" />
                    {item.href ? (
                      <a href={item.href} className="text-white/55 hover:text-[#c9a349] text-sm transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-white/55 text-sm">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "компаний вступили в СРО", icon: "Building2" },
                { value: "12 лет", label: "на рынке", icon: "TrendingUp" },
                { value: "0", label: "окончательных отказов", icon: "ShieldCheck" },
                { value: "1 год", label: "сопровождение включено", icon: "Calendar" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="group bg-white/3 border border-white/8 hover:border-[#c9a349]/35 rounded-2xl p-7 flex flex-col items-center text-center transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#c9a349]/10 border border-[#c9a349]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a349]/20 transition-all">
                    <Icon name={s.icon} size={20} className="text-[#c9a349]" fallback="Star" />
                  </div>
                  <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Кейсы ─────────────────────────────────
function CasesSection() {
  return (
    <section id="cases" className="py-24 bg-[#070d1a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a349]/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Реальные результаты
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Кейсы и результаты
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Истории компаний, которым мы помогли получить допуск и продолжить работу
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c.company} delay={i * 90}>
              <div className="group bg-white/3 border border-white/8 hover:border-[#c9a349]/35 rounded-2xl p-8 flex flex-col h-full transition-all duration-400">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a349]/10 border border-[#c9a349]/20 flex items-center justify-center">
                    <Icon name="Building2" size={22} className="text-[#c9a349]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-[#c9a349]/10 text-[#c9a349] border border-[#c9a349]/20 px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <div className="text-white/35 text-[10px] uppercase tracking-widest mb-1.5">{c.type}</div>
                <h3 className="font-display text-xl font-bold text-white mb-1">{c.company}</h3>
                <div className="text-[#c9a349] text-sm font-semibold mb-4">{c.result}</div>
                <p className="text-white/50 text-sm leading-relaxed flex-grow">{c.text}</p>
                <div className="mt-6 pt-5 border-t border-white/6 flex items-center gap-2 text-xs text-white/30">
                  <Icon name="CheckCircle" size={13} className="text-green-500" />
                  Задача выполнена успешно
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-[#0a1220] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Вопросы и ответы
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Часто задают
            </h2>
          </div>
        </Reveal>

        <div className="space-y-2">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className={`bg-white/3 border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-[#c9a349]/40" : "border-white/8"}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="text-white font-semibold text-base pr-4 group-hover:text-[#e0bc6a] transition-colors">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      open === i
                        ? "border-[#c9a349] bg-[#c9a349]/15 rotate-45"
                        : "border-white/15 group-hover:border-[#c9a349]/40"
                    }`}
                  >
                    <Icon name="Plus" size={13} className={open === i ? "text-[#c9a349]" : "text-white/40"} />
                  </div>
                </button>
                {open === i && (
                  <div className="px-7 pb-7">
                    <div className="h-px bg-[#c9a349]/18 mb-5" />
                    <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SEND_LEAD_URL = "https://functions.poehali.dev/325334d9-4cb7-453d-ab53-516f6e5e516d";

// ── Контакты + Форма ──────────────────────
function ContactsSection() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="py-24 bg-[#070d1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,163,73,0.05),transparent)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a349]/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-block text-[#c9a349] text-[11px] font-semibold tracking-[0.22em] uppercase border border-[#c9a349]/30 bg-[#c9a349]/6 px-4 py-1.5 rounded-full mb-4">
              Начать работу
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Получите допуск СРО
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Оставьте заявку — перезвоним в течение часа, проконсультируем бесплатно и назовём точную стоимость
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Контакты */}
          <Reveal>
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-white mb-7">Свяжитесь с нами</h3>
              {(
                [
                  { icon: "Phone", label: "Телефон", value: "8 499 350-27-07", href: "tel:84993502707" },
                  { icon: "Mail", label: "Электронная почта", value: "info@wellcons.ru", href: "mailto:info@wellcons.ru" },
                  { icon: "MapPin", label: "Офис", value: "115088, Москва, ул. Симоновский Вал 20 к 3" },
                ] as { icon: string; label: string; value: string; href?: string }[]
              ).map((item) => (
                <div key={item.label} className="bg-white/3 border border-white/8 rounded-2xl p-5 flex items-center gap-5">
                  <div className="w-11 h-11 rounded-xl bg-[#c9a349]/10 border border-[#c9a349]/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#c9a349]" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium text-sm hover:text-[#c9a349] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white font-medium text-sm">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="bg-white/3 border border-white/8 rounded-2xl p-5 flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl bg-[#c9a349]/10 border border-[#c9a349]/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={18} className="text-[#c9a349]" />
                </div>
                <div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">Режим работы</div>
                  <div className="text-white font-medium text-sm">Пн–Пт: 9:00 – 18:00</div>
                  <div className="text-white/35 text-xs mt-0.5">Заявки принимаем круглосуточно</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Форма */}
          <Reveal delay={150}>
            <div className="bg-white/3 border border-[#c9a349]/20 rounded-2xl p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Оставить заявку</h3>

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={30} className="text-green-400" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">Заявка отправлена!</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Мы свяжемся с вами в течение часа в рабочее время. Спасибо, что выбрали ВЕЛКОНС!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#c9a349]/50 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#c9a349]/50 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Компания</label>
                    <input
                      type="text"
                      placeholder='ООО "Название"'
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c9a349]/50 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">Что нужно оформить?</label>
                    <textarea
                      rows={3}
                      placeholder="Строительство / проектирование / изыскания, сроки..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c9a349]/50 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-gradient-to-r from-[#c9a349] to-[#a07830] hover:from-[#e0bc6a] hover:to-[#c9a349] text-[#070d1a] font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#c9a349]/20 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#070d1a]/30 border-t-[#070d1a] rounded-full animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={17} />
                        Отправить заявку
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                      <Icon name="AlertCircle" size={15} className="text-red-400 flex-shrink-0" />
                      <span className="text-red-400 text-sm">Ошибка отправки. Позвоните нам: 8 499 350-27-07</span>
                    </div>
                  )}
                  <p className="text-white/25 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="#" className="text-[#c9a349]/60 hover:text-[#c9a349] underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Футер ─────────────────────────────────
function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#050b18] border-t border-white/6 py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c9a349] to-[#8b6b1e] flex items-center justify-center">
                <span className="text-[#070d1a] font-bold text-xs">ВК</span>
              </div>
              <div>
                <div className="text-white font-bold font-display tracking-wider">ВЕЛКОНС</div>
                <div className="text-[#c9a349] text-[9px] tracking-[0.22em] uppercase">Допуски СРО</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Услуги оказывает ИП Великоиваненко Сергей Васильевич. Работаем по договору по всей России.
            </p>
          </div>

          <div>
            <div className="text-white/25 text-[10px] uppercase tracking-widest mb-4">Разделы сайта</div>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-white/45 hover:text-[#c9a349] text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/25 text-[10px] uppercase tracking-widest mb-4">Контакты</div>
            <div className="space-y-3">
              <a href="tel:84993502707" className="flex items-center gap-2 text-white/45 hover:text-[#c9a349] text-sm transition-colors">
                <Icon name="Phone" size={13} className="text-[#c9a349]" />
                8 499 350-27-07
              </a>
              <a href="mailto:info@wellcons.ru" className="flex items-center gap-2 text-white/45 hover:text-[#c9a349] text-sm transition-colors">
                <Icon name="Mail" size={13} className="text-[#c9a349]" />
                info@wellcons.ru
              </a>
              <div className="flex items-start gap-2 text-white/35 text-sm">
                <Icon name="MapPin" size={13} className="text-[#c9a349] mt-0.5 flex-shrink-0" />
                <span>115088, Москва,<br />ул. Симоновский Вал 20 к 3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/22 text-xs">
            © 2024 ВЕЛКОНС. ИП Великоиваненко С.В. Все права защищены.
          </p>
          <a href="#" className="text-white/22 hover:text-[#c9a349]/60 text-xs transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Главный компонент ──────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-[#070d1a] font-body">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <HowSection />
        <AboutSection />
        <CasesSection />
        <FaqSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
}