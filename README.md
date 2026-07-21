# Ernest Muzafarov — Frontend Portfolio

Personal portfolio for a frontend developer focused on React, TypeScript, internal tools, dashboards, forms, and real workflow logic.

[Live website](https://ernestmuzafarov.tech) · [GitHub](https://github.com/MrSSStrange) · [LinkedIn](https://www.linkedin.com/in/ernest-muzafarov-919a323a2/)

## Overview

The portfolio connects my frontend development work with my technical support background in medical software. It presents projects built around practical clinic and support workflows, including filters, status management, forms, dashboards, and browser-side data persistence.

I am open to remote internship and junior frontend opportunities, as well as relocation.

## Features

- Responsive layout for desktop and mobile
- Dark, dim, and light themes with saved preferences
- Terminal-style hero animation and reading progress indicator
- Optional entry sound with an explicit on/off control
- Interactive project previews and case studies
- Built-in CV preview
- Floating AI Portfolio Assistant
- SEO, Open Graph, Twitter Card, and structured-data metadata
- Custom-domain deployment

## Tech Stack

| Area | Technologies |
| --- | --- |
| Portfolio UI | HTML, CSS, Vanilla JavaScript |
| Browser APIs | Fetch API, DOM, localStorage |
| AI assistant | Cloudflare Workers, Workers AI, Durable Objects |
| Deployment | GitHub Pages, custom domain |
| Project focus | React, TypeScript, Vite, REST APIs |

The AI assistant runs through a Cloudflare Worker, keeping backend logic and credentials out of the browser. Its API includes origin restrictions, request limits, and input/output guards.

## Projects

### [Ernest SupportDesk](https://github.com/MrSSStrange/ernest-supportdesk)

React and TypeScript support desk interface for clinic tickets, priorities, statuses, filters, workflow queues, and local persistence.

### [Clinic Appointments Dashboard](https://github.com/MrSSStrange/clinic-appointments-dashboard)

React and TypeScript dashboard for appointment planning, patient context, doctor schedules, visit statuses, filters, and basic analytics.

### [Clinic Patients](https://github.com/MrSSStrange/clinic-patients)

Vanilla JavaScript application for patient cards, forms, search, sorting, filtering, and browser-side data persistence.

## Project Structure

~~~text
.
├── index.html
├── styles.css
├── main.js
├── assets/
│   ├── ernest-muzafarov-cv.html
│   └── favicon.svg
├── _assets/
│   └── entry-sound.mp3
├── worker/
│   ├── src/index.mjs
│   ├── wrangler.toml
│   ├── test-guards.mjs
│   └── README.md
├── og-image.png
├── favicon.ico
└── CNAME
~~~

## Run Locally

No build step or package installation is required.

~~~bash
git clone https://github.com/MrSSStrange/ernest-portfolio.git
cd ernest-portfolio
python3 -m http.server 8000
~~~

Open [http://localhost:8000](http://localhost:8000).

The production AI endpoint accepts requests only from `ernestmuzafarov.tech`, so the assistant may be unavailable when the site is opened locally.

To run the Worker guard tests:

~~~bash
node worker/test-guards.mjs
~~~

## Contact

- Email: [mega.ernest13@gmail.com](mailto:mega.ernest13@gmail.com)
- GitHub: [MrSSStrange](https://github.com/MrSSStrange)
- LinkedIn: [Ernest Muzafarov](https://www.linkedin.com/in/ernest-muzafarov-919a323a2/)
- Portfolio: [ernestmuzafarov.tech](https://ernestmuzafarov.tech)
