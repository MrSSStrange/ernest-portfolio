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
    throw new Error(
      data.error || "AI assistant is temporarily unavailable.",
    );
  }

  if (!data.answer) {
    throw new Error("Empty response from AI assistant.");
  }

  return data.answer;
}

function getAiErrorMessage(error) {
  const message = error?.message || "AI assistant is temporarily unavailable.";

  if (message === "Failed to fetch") {
    return "AI assistant is unavailable. Please try again later.";
  }

  return message;
}

async function submitAiQuestion(question) {
  const cleanQuestion = String(question || "").trim();

  if (aiChatLoading) return false;

  if (!cleanQuestion) {
    appendAiMessage("error", "Please enter a question.");
    return false;
  }

  if (cleanQuestion.length > 500) {
    appendAiMessage(
      "error",
      "Question is too long. Maximum length is 500 characters.",
    );
    return false;
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
  { text: "> Frontend Developer", type: "out" },
  { text: "$ background", type: "cmd" },
  { text: "> technical support lead · medical software", type: "out" },
  { text: "$ focus", type: "cmd" },
  { text: "> React · TypeScript · JavaScript · UI logic", type: "out" },
  { text: "$ ./greet", type: "cmd" },
  {
    text: "> building clean interfaces for real workflows.",
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
