import fs from 'node:fs';
const template = fs.readFileSync('dist/index.html', 'utf8');
const siteUrl = JSON.parse(fs.readFileSync('package.json', 'utf8')).homepage;
const pages = {
  '': ['Эрнест Музафаров — AI / ML Engineering', 'Личная лаборатория Эрнеста: AI, машинное обучение, робототехника, учебные проекты и визуальные истории.'],
  'journal/ai-agent': ['Как устроен AI-агент — Эрнест', 'Модель, инструменты, память и проверка результата. Интерактивный разбор агентного цикла.'],
  'journal/robot-perception': ['Как робот воспринимает мир — Эрнест', 'Путь от наблюдения к действию: датчики, восприятие, политика и обратная связь.'],
  'journal/optimus-evolution': ['Эволюция Tesla Optimus — Эрнест', 'Интерактивная хронология Optimus с официальными видео и первичными источниками.'],
  'credits': ['Источники и материалы — Эрнест', 'Авторство, лицензии модели и фонового видео, источники материалов сайта.'],
  'model-review': ['Модель Optimus — контрольные ракурсы', 'Голова и шея готового ассета: фронтальный, боковой ракурс и три четверти.'],
};
const escape = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const [path, [title, description]] of Object.entries(pages)) {
  const canonical = new URL(path ? `/${path}/` : '/', siteUrl).href;
  const image = new URL('/images/robotics-film-poster.jpg', siteUrl).href;
  const social = `<link rel="canonical" href="${canonical}"/>\n<meta property="og:type" content="${path.startsWith('journal/') ? 'article' : 'website'}"/>\n<meta property="og:locale" content="ru_RU"/>\n<meta property="og:site_name" content="Ernest Lab"/>\n<meta property="og:title" content="${escape(title)}"/>\n<meta property="og:description" content="${escape(description)}"/>\n<meta property="og:url" content="${canonical}"/>\n<meta property="og:image" content="${image}"/>\n<meta property="og:image:alt" content="Промышленная робототехника — визуальная тема Ernest Lab"/>\n<meta name="twitter:card" content="summary_large_image"/>`;
  const dir = path ? `dist/${path}` : 'dist';
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`).replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escape(description)}"`).replace('</head>', `${social}\n</head>`));
}
fs.writeFileSync('dist/404.html', template.replace(/<title>.*?<\/title>/, '<title>Страница не найдена — Эрнест</title>').replace('</head>', '<meta name="robots" content="noindex"/></head>'));
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).filter(p=>p!=='model-review').map(p=>`<url><loc>${new URL(p ? `/${p}/` : '/',siteUrl).href}</loc></url>`).join('')}</urlset>\n`);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /model-review/\nSitemap: ${new URL('/sitemap.xml',siteUrl).href}\n`);
fs.writeFileSync('dist/_headers', '/models/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log(`Generated ${Object.keys(pages).length} static pages, 404, sitemap and robots.txt`);
