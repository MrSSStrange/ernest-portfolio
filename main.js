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
    const baseDelay = line.type === "cmd" ? 50 : 32;
    setTimeout(typeNext, baseDelay + Math.random() * 25);
  } else {
    lineIdx++;
    charIdx = 0;
    setTimeout(typeNext, line.type === "cmd" ? 200 : 350);
  }
}

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  setTimeout(typeNext, 600);
}

// Start after fonts load to avoid monospace reflow mid-typing
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(startTyping);
} else {
  window.addEventListener("load", startTyping);
}
// Fallback in case font event never fires
setTimeout(startTyping, 1800);

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

// =====================================================
// Live GitHub star/fork counters
// Uses localStorage cache (10 min) to stay under rate limit.
// =====================================================
const GITHUB_USER = 'MrSSStrange';

const FALLBACK_REPOS = [
  {
    name: "ernest-supportdesk",
    desc: "support desk frontend app for ticket workflows",
    stars: 0,
    forks: 0,
    lang: "TypeScript",
    url: "https://github.com/MrSSStrange/ernest-supportdesk",
  },
  {
    name: "clinic-appointments-dashboard",
    desc: "clinic appointment dashboard with filters and status logic",
    stars: 0,
    forks: 0,
    lang: "TypeScript",
    url: "https://github.com/MrSSStrange/clinic-appointments-dashboard",
  },
  {
    name: "clinic-patients",
    desc: "patient management app with DOM, forms and localStorage",
    stars: 0,
    forks: 0,
    lang: "JavaScript",
    url: "https://github.com/MrSSStrange/clinic-patients",
  },
];

async function fetchGitHubStats() {
  const cacheKey = `gh_stats_${GITHUB_USER}`;

  // Try cache first
  if (localStorage) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < 10 * 60 * 1000) {
          renderGitHubStats(data);
          return;
        }
      }
    } catch (e) {}
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce(
      (s, r) => s + (r.stargazers_count || 0),
      0,
    );
    const totalForks = repos.reduce(
      (s, r) => s + (r.forks_count || 0),
      0,
    );

    const topRepos = repos
      .filter((r) => !r.fork)
      .sort(
        (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0),
      )
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        desc: r.description || "—",
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        lang: r.language || "—",
        url: r.html_url,
      }));

    const data = {
      username: GITHUB_USER,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
      totalForks,
      topRepos,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {}
    renderGitHubStats(data);
  } catch (e) {
    console.warn("GitHub fetch failed, using fallbacks:", e.message);
    renderGitHubStats(null);
  }
}

function renderGitHubStats(data) {
  const stats = {
    repos: data ? data.publicRepos : null,
    stars: data ? data.totalStars : null,
    forks: data ? data.totalForks : null,
    followers: data ? data.followers : null,
  };

  document.querySelectorAll("[data-stat]").forEach((el) => {
    const key = el.dataset.stat;
    const fallback = parseInt(el.dataset.fallback, 10);
    const value = stats[key] != null ? stats[key] : fallback;
    animateCounter(el, value);
  });

  const repoGrid = document.getElementById("repoGrid");
  if (!repoGrid) return;

  const repos =
    data && data.topRepos && data.topRepos.length
      ? data.topRepos
      : FALLBACK_REPOS;

  repoGrid.innerHTML = repos
    .map(
      (repo) => `
    <a href="${repo.url}" target="_blank" rel="noopener" class="repo-card">
<div class="repo-head">
  <span class="repo-name">${GITHUB_USER}/<strong>${repo.name}</strong></span>
  <span class="repo-lang">${repo.lang}</span>
</div>
<p class="repo-desc">${escapeHtml(repo.desc)}</p>
<div class="repo-stats">
  <span class="repo-stat">
    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    ${repo.stars.toLocaleString()}
  </span>
  <span class="repo-stat">
    <svg viewBox="0 0 24 24"><path d="M6 3a3 3 0 0 1 3 3v2h6V6a3 3 0 1 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3V8H9v1a3 3 0 0 1-3 3 3 3 0 1 1-3-3 3 3 0 0 1 3-3z"/></svg>
    ${repo.forks.toLocaleString()}
  </span>
</div>
    </a>
  `,
    )
    .join("");
}

function animateCounter(el, target, duration = 1800) {
  if (isNaN(target)) target = 0;
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (target - start) * eased);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

// Fetch GitHub stats when the section scrolls into view
const ghSection = document.getElementById("github");
if (ghSection) {
  const ghObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchGitHubStats();
        ghObserver.disconnect();
      }
    },
    { threshold: 0.15 },
  );
  ghObserver.observe(ghSection);
}
