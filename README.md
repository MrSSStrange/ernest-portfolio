# Ernest Muzafarov - AI Engineering & Automation

[Live website](https://ernestmuzafarov.tech/) · [Download CV](https://ernestmuzafarov.tech/Ernest-Muzafarov-CV.pdf)

An English portfolio with a dark GSAP interface, interactive canvas visuals, automation case studies, a nine-post AI journal, verified course certificates and a downloadable two-page CV.

The animated AI toolkit includes Claude, ChatGPT, Qwen, DeepSeek, Kimi and GLM. Each tool mark has its own idle animation, and signals run continuously along the connection paths (they pause only off-screen or in a hidden tab). Reduced-motion keeps the signals but turns off the decorative icon motion and tilt. Assets and the CV are embedded in the portable HTML.

## Build and preview

```sh
python3 build.py
node --check review/app-check.js
python3 -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5173/ in your browser. Python's standard library is sufficient for the website build; Node is used only for the optional JavaScript syntax check.

To regenerate the PDF after changing CV content:

```sh
python3 -m pip install -r requirements-pdf.txt
python3 build_cv.py
python3 build.py
```

A content fingerprint prevents the website from embedding an outdated CV. Google Fonts requires a network connection; system font fallbacks remain available.

## Source

- `src/template.html`: page structure and base styles.
- `src/app.js`: GSAP animation, canvas visuals, project demos and journal.
- `src/ai-toolkit.*`: toolkit content, layout and animation.
- `src/enhancements.*`, `src/dialogs.html`: CV, certificates, navigation and dialogs.
- `src/profile.json`: public CV data used by both the website and PDF.
- `src/articles.json`, `src/certificates.json`: English posts and certificate metadata.
- `assets/`, `vendor/`: local assets and GSAP libraries with their original headers.

AI-tool mark sources and transformations are recorded in `assets/ai/ATTRIBUTION.md`. The Web Development certificate retains its original date, 4 November 2026. The JavaScript certificate includes a clearly labelled English translation and its original image.

## GitHub Pages

Source is on `main`. GitHub Pages serves the root of `gh-pages` at `ernestmuzafarov.tech`; the custom domain is preserved in `CNAME`.

```sh
git push origin main
python3 deploy_github.py
```

The deploy helper builds the static site and updates `gh-pages` with a normal fast-forward push, retaining the previous deployment in Git history. The previous portfolio source is preserved in `backup/pre-gsap-2026-11-04`.
