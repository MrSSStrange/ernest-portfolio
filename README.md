# Ernest Muzafarov — Frontend Portfolio

Personal frontend portfolio website built to present my projects, technical support background and frontend focus on internal tools, dashboards, forms and real workflow logic.

## Live Demo

[ernestmuzafarov.tech](https://ernestmuzafarov.tech)

## About

This website presents my frontend portfolio, projects and background in technical support for medical software.

The goal of the project is to create a clean personal page that connects my real work experience with my frontend development direction.

## Features

- Responsive layout
- Dark / dim / light theme switcher
- Explicit sound on / sound off control
- Branded page loader
- Terminal-style hero animation
- Reading progress bar
- Fade-up scroll animations
- On-site CV preview
- Project previews and short case studies
- Why me and What I can build sections
- SEO / social preview metadata
- Floating AI Portfolio Assistant
- Cloudflare Worker API integration
- Workers AI integration
- Custom domain deployment

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Fetch API
- GitHub Pages
- Cloudflare Workers
- Workers AI

## AI Portfolio Assistant

The portfolio includes a floating AI assistant that answers questions about my projects, skills, technical background and frontend development direction.

The frontend sends requests to a Cloudflare Worker API.
The AI logic runs on the backend side, so no API keys are exposed in the browser.

**Stack:** Vanilla JavaScript, Fetch API, Cloudflare Workers, Workers AI

## Project Structure

```text
index.html
styles.css
main.js
assets/
  ernest-muzafarov-cv.html
  favicon.svg
_assets/
  entry-sound.mp3
worker/
  src/index.mjs
  wrangler.toml
  test-guards.mjs
og-image.png
favicon.ico
```

## Worker Guard Tests

```bash
node worker/test-guards.mjs
```

## Focus

Frontend development, React, TypeScript, dashboards, forms, internal tools, support queues and medical software workflows.

## Portfolio Projects

- **Ernest SupportDesk** — support desk interface for clinic support tickets, priorities, statuses, filters and internal workflow queues.
- **Clinic Appointments Dashboard** — dashboard for clinic appointment planning with patient context, doctor schedules, visit statuses, filters and simple analytics.
- **Clinic Patients** — vanilla JavaScript app for patient cards, search, sorting, filtering and browser-side data persistence.
