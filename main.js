// =====================================================
// Branded page loader
// =====================================================
const siteLoader = document.getElementById("siteLoader");
const loaderStartedAt =
  typeof performance !== "undefined" ? performance.now() : Date.now();
let siteLoaderHidden = false;

function hideSiteLoader() {
  if (siteLoaderHidden) return;
  siteLoaderHidden = true;

  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  const remainingDelay = Math.max(0, 520 - (now - loaderStartedAt));

  window.setTimeout(() => {
    if (!siteLoader) {
      document.documentElement.classList.remove("has-loader");
      return;
    }

    siteLoader.classList.add("is-hidden");
    siteLoader.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      document.documentElement.classList.remove("has-loader");
      siteLoader.remove();
    }, 500);
  }, remainingDelay);
}

if (document.readyState === "complete") {
  hideSiteLoader();
} else {
  window.addEventListener("load", hideSiteLoader, { once: true });
  window.setTimeout(hideSiteLoader, 1800);
}

// =====================================================
// Entry sound
// =====================================================
const ENTRY_SOUND_SRC =
  "https://raw.githubusercontent.com/MrSSStrange/ernest-portfolio/f641a277350dbb68888ecc0eef9f93f8cf19f36f/_assets/entry-sound.mp3";
const ENTRY_SOUND_ENABLED_KEY = "entrySoundEnabled";
const soundToggle = document.getElementById("soundToggle");
let entryAudio = null;

function getSoundEnabled() {
  try {
    return localStorage.getItem(ENTRY_SOUND_ENABLED_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function setSoundEnabled(isEnabled) {
  try {
    localStorage.setItem(ENTRY_SOUND_ENABLED_KEY, String(isEnabled));
  } catch (error) {}
}

function getEntryAudio() {
  if (!entryAudio) {
    entryAudio = new Audio(ENTRY_SOUND_SRC);
    entryAudio.preload = "none";
    entryAudio.volume = 0.28;
  }

  return entryAudio;
}

function updateSoundToggle(isEnabled) {
  if (!soundToggle) return;

  const label = isEnabled ? "Sound on" : "Sound off";
  const text = soundToggle.querySelector(".sound-toggle-text");

  soundToggle.setAttribute("aria-label", label);
  soundToggle.setAttribute("aria-pressed", String(isEnabled));
  soundToggle.setAttribute("title", label);

  if (text) {
    text.textContent = label.toLowerCase();
  }
}

async function playEntrySound() {
  try {
    const audio = getEntryAudio();
    audio.currentTime = 0;
    await audio.play();
  } catch (error) {}
}

function stopEntrySound() {
  if (!entryAudio) return;

  entryAudio.pause();
  entryAudio.currentTime = 0;
}

if (soundToggle) {
  updateSoundToggle(getSoundEnabled());

  soundToggle.addEventListener("click", () => {
    const nextEnabled = !getSoundEnabled();

    setSoundEnabled(nextEnabled);
    updateSoundToggle(nextEnabled);

    if (nextEnabled) {
      playEntrySound();
    } else {
      stopEntrySound();
    }
  });
}

// =====================================================
// CV preview modal
// =====================================================
const cvPreview = document.getElementById("cvPreview");
const cvPreviewFrame = document.getElementById("cvPreviewFrame");
const cvPreviewClose = document.getElementById("cvPreviewClose");
const cvPreviewLinks = document.querySelectorAll(".js-cv-preview");
let cvPreviewLastFocus = null;

function handleCvFrameLoad() {
  let frameDocument = null;

  try {
    frameDocument = cvPreviewFrame?.contentDocument;
  } catch (error) {
    return;
  }

  if (!frameDocument) return;

  frameDocument.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("mailto:")) return;

    event.preventDefault();
    window.open(link.href, "_blank", "noopener");
  });
}

function openCvPreview(event) {
  if (!cvPreview || !cvPreviewFrame) return;

  event.preventDefault();
  cvPreviewLastFocus = document.activeElement;

  if (!cvPreviewFrame.getAttribute("src")) {
    cvPreviewFrame.setAttribute("src", cvPreviewFrame.dataset.src || "");
  }

  cvPreview.hidden = false;
  cvPreview.setAttribute("aria-hidden", "false");
  document.body.classList.add("cv-preview-open");

  window.setTimeout(() => {
    cvPreviewClose?.focus();
  }, 50);
}

function closeCvPreview() {
  if (!cvPreview || cvPreview.hidden) return;

  cvPreview.hidden = true;
  cvPreview.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cv-preview-open");

  if (cvPreviewLastFocus && typeof cvPreviewLastFocus.focus === "function") {
    cvPreviewLastFocus.focus();
  }
}

cvPreviewLinks.forEach((link) => {
  link.addEventListener("click", openCvPreview);
});

cvPreviewClose?.addEventListener("click", closeCvPreview);
cvPreviewFrame?.addEventListener("load", handleCvFrameLoad);
document.querySelectorAll("[data-cv-close]").forEach((element) => {
  element.addEventListener("click", closeCvPreview);
});

// =====================================================
// 3-state theme toggle (dark / dim / light) with persistence
// =====================================================
const themes = ["dark", "dim", "light"];
const themeButtons = document.querySelectorAll("[data-theme-set]");

function setTheme(theme) {
  if (!themes.includes(theme)) theme = "dark";
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.themeSet === theme);
  });
}

// Init from storage (already set in head, but sync the buttons)
const savedTheme =
  document.documentElement.getAttribute("data-theme") || "dark";
setTheme(savedTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.themeSet));
});

// =====================================================
// AI Portfolio Assistant
// =====================================================
const AI_ASSISTANT_ENDPOINT =
  "https://ernest-ai-assistant.ernestmuzafarov.workers.dev/ask";
const AI_SAFE_RESPONSE =
  "Я могу отвечать только на вопросы о портфолио Эрнеста.";
const AI_TOO_LONG_RESPONSE =
  "Слишком длинный запрос. Задайте короткий вопрос о портфолио Эрнеста.";
const MAX_MESSAGE_LENGTH = 1000;

const BLOCKED_INPUT_PATTERNS = [
  /system prompt/i,
  /developer prompt/i,
  /system instructions/i,
  /developer instructions/i,
  /hidden instructions/i,
  /hidden.*prompt/i,
  /previous.*prompt/i,
  /show.*instructions?/i,
  /print.*instructions?/i,
  /list.*instructions?/i,
  /output.*instructions?/i,
  /reveal.*instructions?/i,
  /previous.*instructions?/i,
  /скрыт(ые|ая|ой|ую|ых)?\s+инструкц/i,
  /системн(ый|ого|ое|ые|ых)\s+(промпт|приглашени)/i,
  /приглашение разработчика/i,
  /выведи.*инструкц/i,
  /вывести.*инструкц/i,
  /покажи.*инструкц/i,
  /какая инструкция/i,
  /ignore previous/i,
  /проигнорируй предыдущ/i,
  /ты больше не/i,
  /теперь ты/i,
  /admin mode/i,
  /system administrator/i,
  /system role/i,
  /developer role/i,
  /роль системы/i,
  /роль разработчика/i,
  /repeat everything before/i,
  /before this message verbatim/i,
  /previous.*messages?/i,
  /hidden.*messages?/i,
  /предыдущ.*сообщ/i,
  /скрыт.*сообщ/i,
  /переменные среды/i,
  /api.?key/i,
  /api\s*ключ/i,
  /секрет/i,
  /environment variables/i,
  /internal memory/i,
  /внутренн(яя|ей)\s+память/i,
  /backend implementation/i,
  /backend.*details/i,
  /детал.*backend/i,
  /техническ.*backend/i,
  /<\s*(script|img|iframe|svg|object|embed|link|style|meta|base)\b/i,
  /on[a-z]+\s*=/i,
  /javascript\s*:/i,
];

const BLOCKED_OUTPUT_PATTERNS = [
  /отвечайте только/i,
  /answer only questions/i,
  /используйте только контекст/i,
  /use only .*context/i,
  /не выдумывайте/i,
  /do not invent/i,
  /never reveal/i,
  /you are the ai portfolio assistant/i,
  /если вопрос на русском/i,
  /если вопрос на английском/i,
  /system prompt/i,
  /developer prompt/i,
  /system instructions/i,
  /developer instructions/i,
  /hidden instructions/i,
  /скрыт(ые|ая|ой|ую|ых)?\s+инструкц/i,
  /internal context/i,
  /внутренн(ий|его|ем|яя|ей)\s+контекст/i,
  /environment variables/i,
  /backend implementation details/i,
  /api.?key/i,
  /api\s*ключ/i,
  /секрет/i,
];

function matchesAnyPattern(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function isBlockedAiInput(text) {
  return matchesAnyPattern(String(text || ""), BLOCKED_INPUT_PATTERNS);
}

function isBlockedAiOutput(text) {
  return matchesAnyPattern(String(text || ""), BLOCKED_OUTPUT_PATTERNS);
}

const aiChat = document.getElementById("aiChat");
const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatPanel = document.getElementById("aiChatPanel");
const aiChatClose = document.getElementById("aiChatClose");
const aiChatBody = document.getElementById("aiChatBody");
const aiChatForm = document.getElementById("aiChatForm");
const aiChatInput = document.getElementById("aiChatInput");
const aiChatSubmit = document.getElementById("aiChatSubmit");
const aiChatSuggestions = document.querySelectorAll(".ai-chat-suggestion");

let aiChatLoading = false;

function openAiChat() {
  if (!aiChat || !aiChatPanel) return;

  aiChatPanel.hidden = false;
  aiChatToggle?.setAttribute("aria-label", "Close AI assistant");
  aiChatToggle?.setAttribute("aria-expanded", "true");

  setTimeout(() => {
    aiChatInput?.focus();
  }, 50);
}

function closeAiChat() {
  if (!aiChat || !aiChatPanel) return;

  aiChatPanel.hidden = true;
  aiChatToggle?.setAttribute("aria-label", "Open AI assistant");
  aiChatToggle?.setAttribute("aria-expanded", "false");
}

function toggleAiChat() {
  if (!aiChatPanel) return;

  if (aiChatPanel.hidden) {
    openAiChat();
  } else {
    closeAiChat();
  }
}

function appendAiMessage(type, text) {
  if (!aiChatBody) return null;

  const message = document.createElement("div");
  message.className = `ai-message ai-message-${type}`;

  const label = document.createElement("span");
  label.className = "ai-message-label";
  label.textContent =
    type === "user" ? "you" : type === "error" ? "error" : "assistant";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  message.appendChild(label);
  message.appendChild(paragraph);
  aiChatBody.appendChild(message);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;

  return message;
}

function setAiChatLoading(isLoading) {
  aiChatLoading = isLoading;

  if (aiChatSubmit) {
    aiChatSubmit.disabled = isLoading;
    aiChatSubmit.textContent = isLoading ? "..." : "send";
  }

  if (aiChatInput) {
    aiChatInput.disabled = isLoading;
  }

  aiChatSuggestions.forEach((button) => {
    button.disabled = isLoading;
  });
}

async function askPortfolio(question) {
  const response = await fetch(AI_ASSISTANT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error("AI assistant is temporarily unavailable.");
  }

  const answer = typeof data.answer === "string" ? data.answer.trim() : "";

  if (!answer) {
    throw new Error("AI assistant is temporarily unavailable.");
  }

  return isBlockedAiOutput(answer) ? AI_SAFE_RESPONSE : answer;
}

function getAiErrorMessage(error) {
  const message = error?.message || "";

  if (message === "Failed to fetch") {
    return "AI assistant is temporarily unavailable.";
  }

  return "AI assistant is temporarily unavailable.";
}

async function submitAiQuestion(question) {
  const cleanQuestion = String(question || "").trim();

  if (aiChatLoading) return false;

  if (!cleanQuestion) {
    appendAiMessage("error", "Please enter a question.");
    return false;
  }

  if (cleanQuestion.length > MAX_MESSAGE_LENGTH) {
    appendAiMessage("error", AI_TOO_LONG_RESPONSE);
    return false;
  }

  if (isBlockedAiInput(cleanQuestion)) {
    appendAiMessage("user", cleanQuestion);
    appendAiMessage("assistant", AI_SAFE_RESPONSE);
    return true;
  }

  appendAiMessage("user", cleanQuestion);
  setAiChatLoading(true);

  const loadingMessage = appendAiMessage("assistant", "Thinking...");

  try {
    const answer = await askPortfolio(cleanQuestion);

    if (loadingMessage) {
      const paragraph = loadingMessage.querySelector("p");
      if (paragraph) paragraph.textContent = answer;
    } else {
      appendAiMessage("assistant", answer);
    }

    return true;
  } catch (error) {
    if (loadingMessage) loadingMessage.remove();
    appendAiMessage("error", getAiErrorMessage(error));
    return false;
  } finally {
    setAiChatLoading(false);
  }
}

if (aiChatToggle) {
  aiChatToggle.addEventListener("click", toggleAiChat);
}

if (aiChatClose) {
  aiChatClose.addEventListener("click", closeAiChat);
}

if (aiChatForm && aiChatInput) {
  aiChatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = aiChatInput.value;
    const submitted = await submitAiQuestion(question);

    if (submitted) {
      aiChatInput.value = "";
    }
  });
}

aiChatSuggestions.forEach((button) => {
  button.addEventListener("click", async () => {
    const question = button.dataset.question || button.textContent.trim();

    openAiChat();

    if (aiChatInput) {
      aiChatInput.value = question;
    }

    const submitted = await submitAiQuestion(question);

    if (submitted && aiChatInput) {
      aiChatInput.value = "";
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cvPreview && !cvPreview.hidden) {
    closeCvPreview();
    return;
  }

  if (event.key === "Escape" && aiChatPanel && !aiChatPanel.hidden) {
    closeAiChat();
  }
});

if (aiChatInput && aiChatForm) {
  aiChatInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    aiChatForm.requestSubmit();
  });
}

// =====================================================
// Reading progress bar
// =====================================================
const progressBar = document.getElementById("progressBar");
let ticking = false;

function updateProgress() {
  const scrollY = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = Math.min(Math.max(progress, 0), 100) + "%";
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  },
  { passive: true },
);

updateProgress();

// =====================================================
// Cursor glow on pointer movement
// =====================================================
const cursorGlow = document.getElementById("cursorGlow");
const canUseCursorGlow =
  cursorGlow &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseCursorGlow) {
  let glowX = 0;
  let glowY = 0;
  let glowFrame = null;

  function renderCursorGlow() {
    cursorGlow.style.transform = `translate3d(${glowX - 210}px, ${
      glowY - 210
    }px, 0)`;
    glowFrame = null;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      glowX = event.clientX;
      glowY = event.clientY;
      cursorGlow.classList.add("is-visible");

      if (!glowFrame) {
        glowFrame = requestAnimationFrame(renderCursorGlow);
      }
    },
    { passive: true },
  );

  window.addEventListener("pointerleave", () => {
    cursorGlow.classList.remove("is-visible");
  });
}

// =====================================================
// Typewriter hero greeting
// =====================================================
const typewriterEl = document.getElementById("typewriter");
const heroCta = document.getElementById("heroCta");

const lines = [
  { text: "$ whoami", type: "cmd" },
  { text: "> Ernest Muzafarov", type: "out" },
  { text: "$ role", type: "cmd" },
  { text: "> Frontend Developer · internal tools focus", type: "out" },
  { text: "$ background", type: "cmd" },
  { text: "> technical support lead · medical software", type: "out" },
  { text: "$ focus", type: "cmd" },
  {
    text: "> support queues · dashboards · forms · filters",
    type: "out",
  },
  { text: "$ ./greet", type: "cmd" },
  {
    text: "> building interfaces for real operational workflows.",
    type: "out",
  },
];

const caret = document.createElement("span");
caret.className = "caret";
caret.textContent = "▋";

let lineIdx = 0;
let charIdx = 0;
let currentLineEl = null;
let typingStarted = false;
let typingDone = false;

function typeNext() {
  if (lineIdx >= lines.length) {
    if (!typingDone) {
      typingDone = true;
      heroCta.classList.add("shown");
    }
    return;
  }

  const line = lines[lineIdx];

  if (charIdx === 0) {
    currentLineEl = document.createElement("div");
    currentLineEl.className = "term-line term-" + line.type;
    typewriterEl.appendChild(currentLineEl);
  }

  if (charIdx < line.text.length) {
    currentLineEl.textContent = line.text.slice(0, charIdx + 1);
    currentLineEl.appendChild(caret);
    charIdx++;
    const baseDelay = line.type === "cmd" ? 24 : 16;
    setTimeout(typeNext, baseDelay + Math.random() * 10);
  } else {
    lineIdx++;
    charIdx = 0;
    setTimeout(typeNext, line.type === "cmd" ? 90 : 140);
  }
}

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  setTimeout(typeNext, 250);
}

// Start after fonts load to avoid monospace reflow mid-typing
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(startTyping);
} else {
  window.addEventListener("load", startTyping);
}
// Fallback in case font event never fires
setTimeout(startTyping, 900);

// =====================================================
// Copy-flash code-block buttons
// =====================================================
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const targetId = btn.dataset.copyTarget;
    const target = document.getElementById(targetId);
    if (!target) return;

    // Get text content without HTML
    const text = target.innerText;

    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e2) {}
      document.body.removeChild(ta);
    }

    const codeBlock = btn.closest(".code-block");
    const label = btn.querySelector(".copy-label");

    codeBlock.classList.add("copied");
    btn.classList.add("copied");
    if (label) label.textContent = "copied";

    setTimeout(() => {
      codeBlock.classList.remove("copied");
      btn.classList.remove("copied");
      if (label) label.textContent = "copy";
    }, 1600);
  });
});

// =====================================================
// Fade-up on scroll (IntersectionObserver)
// =====================================================
const fadeUpEls = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);

fadeUpEls.forEach((el) => fadeObserver.observe(el));

// =====================================================
// Live local time in hero meta
// =====================================================
function updateTime() {
  const el = document.getElementById("localTime");
  if (!el) return;
  const now = new Date();
  // Show Kazan/Moscow time regardless of user's timezone.
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    el.textContent = fmt.format(now) + " MSK";
  } catch (e) {
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    el.textContent = `${h}:${m}`;
  }
}
updateTime();
setInterval(updateTime, 30000);
