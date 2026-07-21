"use client";

import { type FormEvent, useEffect, useState } from "react";

const CONTACT_EMAIL = "mega.ernest13@gmail.com";
const CONTACT_FORM_ACTION = `https://formsubmit.co/${CONTACT_EMAIL}`;
const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

type FormStatus = "idle" | "sending" | "success" | "error";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m4 5 16 7-16 7 3-7-3-7Z" />
    <path d="M7 12h13" />
  </svg>
);

function AndroidMark() {
  return (
    <span className="android-mark" aria-hidden="true">
      <i className="antenna left" />
      <i className="antenna right" />
      <i className="android-eye left" />
      <i className="android-eye right" />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formStatus === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) {
      form.reset();
      setFormStatus("success");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json().catch(() => null)) as {
        success?: boolean | string;
      } | null;

      if (
        !response.ok ||
        result?.success === false ||
        result?.success === "false"
      ) {
        throw new Error("FormSubmit rejected the message");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const submitLabel = {
    idle: "Отправить сообщение",
    sending: "Отправляем…",
    success: "Сообщение принято ✓",
    error: "Повторить отправку",
  }[formStatus];

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".observe");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-icon"><AndroidMark /></span>
          <span>
            <strong>Эрнест</strong>
            <small>Android Developer</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "open" : ""} aria-label="Основная навигация">
          <a href="#about">Обо мне</a>
          <a href="#skills">Навыки</a>
          <a href="#projects">Проекты</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="status-pill reveal delay-1">
            <span className="pulse-dot" />
            Открыт к предложениям
          </div>

          <p className="eyebrow reveal delay-2">Kotlin-first · Mobile experience</p>
          <h1 className="reveal delay-2">
            Создаю Android-
            <span>приложения</span>, которыми удобно пользоваться
          </h1>
          <p className="hero-lead reveal delay-3">
            Продуманный интерфейс, чистая архитектура и внимание к деталям —
            от первой строки Kotlin до готового экрана.
          </p>

          <div className="tech-line reveal delay-3" aria-label="Технологии">
            <span>Kotlin</span><i />
            <span>Jetpack Compose</span><i />
            <span>Android SDK</span>
          </div>

          <div className="hero-actions reveal delay-4">
            <a className="button primary" href="#projects">
              Смотреть проекты <ArrowIcon />
            </a>
            <a className="button secondary" href="#contact">
              Связаться <SendIcon />
            </a>
          </div>
        </div>

        <div className="hero-visual reveal delay-3" aria-label="Android интерфейс">
          <div className="visual-grid" />

          <div className="code-card glass-card float-slow">
            <div className="window-dots"><i /><i /><i /></div>
            <code>
              <span className="code-green">@Composable</span>{"\n"}
              <span>fun </span><b>Greeting</b>(name: String) {"{"}{"\n"}
              {"  "}<span className="code-lime">AndroidApp</span>({"\n"}
              {"    "}ui = <b>Compose</b>,{"\n"}
              {"    "}state = <b>Flow</b>(){"\n"}
              {"  "}){"\n"}
              {"}"}
            </code>
          </div>

          <div className="mascot-card glass-card float-reverse">
            <span className="scan-line" />
            <AndroidMark />
            <small>ANDROID_CORE</small>
          </div>

          <div className="phone float-phone">
            <div className="phone-speaker" />
            <div className="phone-screen">
              <div className="app-topbar">
                <AndroidMark />
                <span>Hello, Эрнест</span>
                <i />
              </div>
              <div className="app-hero-card">
                <small>THIS WEEK</small>
                <strong>3 projects</strong>
                <span className="mini-chart"><i /><i /><i /><i /><i /></span>
              </div>
              <div className="app-grid">
                <div><span className="app-icon code-symbol">{`{ }`}</span><small>Compose</small></div>
                <div><span className="app-icon layers"><i /><i /><i /></span><small>Clean UI</small></div>
              </div>
              <div className="app-task"><i className="check">✓</i><span><b>Build beautiful UI</b><small>Jetpack Compose</small></span><em /></div>
              <div className="app-nav"><i className="active" /><i /><i /><i /></div>
            </div>
          </div>

          <div className="stack-card glass-card float-slow">
            <span>Kotlin-first</span>
            <div className="stack-layers"><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading observe">
          <p className="section-kicker"><span>01</span> Обо мне</p>
          <h2>Опыт поддержки.<br /><em>Мышление разработчика.</em></h2>
        </div>

        <div className="about-grid">
          <article className="about-copy panel observe">
            <span className="corner-label">ABOUT_ME.kt</span>
            <p className="about-lead">
              Я руковожу технической поддержкой медицинской информационной
              системы и развиваюсь в Android-разработке.
            </p>
            <p>
              Работа с реальными пользователями научила меня главному:
              приложение должно не просто работать. Оно должно быть понятным,
              быстрым и решать конкретную задачу человека.
            </p>
            <div className="about-tags">
              <span>Product thinking</span>
              <span>Problem solving</span>
              <span>Android learning</span>
            </div>
          </article>

          <div className="about-stats">
            <article className="stat-card panel observe">
              <span className="stat-number">02</span>
              <p>года в технической поддержке медицинского ПО</p>
              <i className="stat-line" />
            </article>
            <article className="stat-card panel observe">
              <span className="stat-number green-text">∞</span>
              <p>интереса к тому, как устроены хорошие продукты</p>
              <div className="orbit"><i /><i /><i /></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading observe">
          <p className="section-kicker"><span>02</span> Навыки</p>
          <h2>Мой Android-<em>стек</em></h2>
          <p className="section-description">Технологии, с которыми работаю сейчас, и направления дальнейшего развития.</p>
        </div>

        <div className="skill-bento">
          <article className="skill-card skill-main observe">
            <div className="skill-top"><span className="skill-icon kotlin-icon">K</span><small>CORE / ACTIVE</small></div>
            <h3>Kotlin</h3>
            <p>Синтаксис, функции, коллекции, ООП и работа с типами.</p>
            <div className="skill-progress"><i style={{ width: "62%" }} /></div>
            <span className="progress-label">Постоянно практикуюсь</span>
          </article>

          <article className="skill-card compose-card observe">
            <div className="skill-top"><span className="skill-icon compose-icon"><i /><i /><i /></span><small>UI LAYER</small></div>
            <h3>Jetpack Compose</h3>
            <p>Декларативные интерфейсы, состояния и Material Design.</p>
            <div className="compose-demo"><i /><i /><i /><span /></div>
          </article>

          <article className="skill-card android-card observe">
            <div className="skill-top"><AndroidMark /><small>PLATFORM</small></div>
            <h3>Android SDK</h3>
            <p>Жизненный цикл, навигация и устройство Android-приложения.</p>
            <div className="api-level"><span>API</span><b>35</b><i /></div>
          </article>

          <article className="skill-card roadmap-card observe">
            <div className="skill-top"><span className="terminal-icon">_</span><small>NEXT_UP</small></div>
            <h3>Roadmap</h3>
            <ul>
              <li><i className="done">✓</i> Kotlin foundation</li>
              <li><i className="active">02</i> Compose & Material 3</li>
              <li><i>03</i> Coroutines · Flow · Room</li>
              <li><i>04</i> MVVM · Clean Architecture</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading projects-heading observe">
          <div>
            <p className="section-kicker"><span>03</span> Проекты</p>
            <h2>Идеи, которые<br /><em>становятся кодом</em></h2>
          </div>
          <p className="section-description">Карточки будущих pet-проектов. Их можно заменить реальными работами по мере готовности.</p>
        </div>

        <div className="projects-grid">
          <article className="project-card project-featured observe">
            <div className="project-info">
              <div className="project-meta"><span>01 / CONCEPT</span><i>В разработке</i></div>
              <h3>Clinic<span>Desk</span></h3>
              <p>Мобильное рабочее пространство клиники: расписание, задачи и быстрый доступ к данным пациента.</p>
              <div className="project-tags"><span>Kotlin</span><span>Compose</span><span>Room</span></div>
            </div>
            <div className="project-phone">
              <div className="clinic-top"><AndroidMark /><span>ClinicDesk</span><i /></div>
              <p>Доброе утро, Эрнест</p>
              <div className="clinic-date"><small>Сегодня</small><strong>12 приёмов</strong><i /></div>
              <div className="clinic-row"><b>09:30</b><span><strong>Анна Петрова</strong><small>Первичный приём</small></span><i /></div>
              <div className="clinic-row"><b>10:15</b><span><strong>Илья Сергеев</strong><small>Повторный приём</small></span><i /></div>
            </div>
            <div className="project-glow" />
          </article>

          <article className="project-card small-project observe">
            <div className="project-meta"><span>02 / IDEA</span><i>Следующий</i></div>
            <h3>Habit<span>Flow</span></h3>
            <p>Трекер привычек без перегруженных экранов.</p>
            <div className="habit-rings"><i /><i /><i /><strong>76<small>%</small></strong></div>
            <div className="project-tags"><span>Compose</span><span>Flow</span></div>
          </article>

          <article className="project-card small-project terminal-project observe">
            <div className="project-meta"><span>03 / PRACTICE</span><i>Активно</i></div>
            <h3>Kotlin<span>Lab</span></h3>
            <p>Набор небольших задач и экспериментов для закрепления Kotlin.</p>
            <div className="terminal-window">
              <i /><i /><i />
              <code><b>$</b> kotlin run practice.kt<br /><span>→ tests passed: 12/12</span><br /><b>_</b></code>
            </div>
            <div className="project-tags"><span>Kotlin</span><span>Algorithms</span></div>
          </article>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-shell observe">
          <div className="contact-copy">
            <p className="section-kicker"><span>04</span> Контакты</p>
            <h2>Давайте создадим<br /><em>что-то полезное</em></h2>
            <p>Открыт к стажировкам, junior-позициям и интересным Android-проектам.</p>
            <div className="contact-links">
              <a href="https://github.com/MrSSStrange" target="_blank" rel="noopener noreferrer">
                <i aria-hidden="true">GH</i><b>GitHub</b><small>@MrSSStrange</small>
              </a>
              <a href="https://www.linkedin.com/in/ernest-muzafarov-919a323a2/" target="_blank" rel="noopener noreferrer">
                <i aria-hidden="true">in</i><b>LinkedIn</b><small>Ernest Muzafarov</small>
              </a>
              <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                <i aria-hidden="true">✉</i><b>Email</b><small>{CONTACT_EMAIL}</small>
              </a>
            </div>
          </div>

          <form
            className="contact-form"
            action={CONTACT_FORM_ACTION}
            method="POST"
            onSubmit={handleContactSubmit}
            onChange={() => {
              if (formStatus !== "sending") setFormStatus("idle");
            }}
            aria-busy={formStatus === "sending"}
            aria-describedby="contact-status"
          >
            <input type="hidden" name="_subject" value="Новое сообщение с Android-портфолио" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_url" value="https://ernestmuzafarov.tech/#contact" />
            <input hidden type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label>
              <span>Ваше имя</span>
              <input required name="name" maxLength={80} autoComplete="name" placeholder="Как к вам обращаться?" />
            </label>
            <label>
              <span>Email</span>
              <input required type="email" name="email" maxLength={254} autoComplete="email" placeholder="you@company.com" />
            </label>
            <label>
              <span>Сообщение</span>
              <textarea required name="message" rows={4} maxLength={3000} placeholder="Расскажите о задаче" />
            </label>
            <button className="button primary" type="submit" disabled={formStatus === "sending"}>
              {submitLabel}
              {(formStatus === "idle" || formStatus === "error") && <SendIcon />}
            </button>
            <p
              className={`form-note${formStatus === "error" ? " error" : ""}`}
              id="contact-status"
              role={formStatus === "error" ? "alert" : undefined}
              aria-live="polite"
              aria-atomic="true"
            >
              {formStatus === "idle" && "Сообщение придёт Эрнесту прямо на почту."}
              {formStatus === "sending" && "Отправляем сообщение…"}
              {formStatus === "success" && "Готово! Сообщение принято к отправке."}
              {formStatus === "error" && <>
                Не удалось отправить. Напишите напрямую: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </>}
            </p>
          </form>
          <div className="contact-mascot"><AndroidMark /><i /><i /></div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-icon"><AndroidMark /></span><span><strong>Эрнест</strong><small>Android Developer</small></span></a>
        <p>Designed with Android energy · 2026</p>
        <a className="back-top" href="#top">Наверх <span>↑</span></a>
      </footer>

      <div className="scroll-cue" aria-hidden="true">
        <span>scroll</span><i />
      </div>
    </main>
  );
}
