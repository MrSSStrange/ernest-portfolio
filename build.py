from pathlib import Path
import base64
import html
import json
import re
import shutil
from cv_data import cv_source_digest


ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'src'
DIST = ROOT / 'dist'
DIST.mkdir(exist_ok=True)
(ROOT / 'review').mkdir(exist_ok=True)


def escape(value):
    return html.escape(str(value), quote=True)


def script_safe(value):
    return re.sub(r'</script', r'<\\/script', value, flags=re.I)


assets = {}
for key, item in json.loads((ROOT / 'assets/manifest.json').read_text()).items():
    encoded = base64.b64encode((ROOT / 'assets' / item['file']).read_bytes()).decode()
    assets[key] = f"data:{item['mime']};base64,{encoded}"

profile = json.loads((SRC / 'profile.json').read_text())
certificates = json.loads((SRC / 'certificates.json').read_text())
articles = json.loads((SRC / 'articles.json').read_text())
ai_tools = json.loads((SRC / 'ai-toolkit.json').read_text())
assert [tool['name'] for tool in ai_tools] == profile['ai_tools'], 'AI toolkit and CV must list the same tools.'
cv_source_hash = cv_source_digest(SRC / 'profile.json', SRC / 'certificates.json')
assert (ROOT / 'assets/cv-source.sha256').read_text().strip() == cv_source_hash, 'CV PDF is out of date. Regenerate it with build_cv.py before building the site.'

cv = [f'<h2 id="cv-name">{escape(profile["name"])}</h2>',
      f'<p class="cv-headline">{escape(profile["headline"])}</p>', '<div class="cv-contacts">']
for key, label in [('email', profile['contacts']['email']), ('telegram', 'Telegram'), ('github', 'GitHub'), ('linkedin', 'LinkedIn')]:
    value = profile['contacts'].get(key)
    if value:
        href = 'mailto:' + value if key == 'email' else value
        cv.append(f'<a href="{escape(href)}" target="_blank" rel="noreferrer">{escape(label)}</a>')
cv += ['</div>', '<h3>Profile</h3>', f'<p>{escape(profile["summary"])}</p>', '<h3>Skills</h3>']
for group in profile['skill_groups']:
    cv.append(f'<section class="cv-skill-group"><h4>{escape(group["level"])}</h4><ul class="cv-skills">' + ''.join(f'<li>{escape(s)}</li>' for s in group['skills']) + '</ul></section>')
if profile.get('ai_tools'):
    cv.append('<p class="cv-extra-skills"><b>AI tools:</b> ' + escape(' · '.join(profile['ai_tools'])) + '</p>')
if profile.get('additional_skills'):
    cv.append('<p class="cv-extra-skills"><b>Additional automation tools:</b> ' + escape(' · '.join(profile['additional_skills'])) + '</p>')
cv.append('<h3>Experience</h3>')
for job in profile['experience']:
    cv += ['<section class="cv-job">', f'<h4>{escape(job["role"])}</h4>',
           f'<p>{escape(job["company"])}</p>', f'<p class="cv-period">{escape(job["period"])}</p>']
    if job.get('details'):
        cv.append('<ul>' + ''.join(f'<li>{escape(d)}</li>' for d in job['details']) + '</ul>')
    cv.append('</section>')
cv.append('<h3>Selected automation work</h3>')
for project in profile['projects']:
    cv.append(f'<div class="cv-job"><h4>{escape(project["name"])}</h4><p>{escape(project["description"])}</p><p>{escape(project["result"])}</p></div>')
cv.append('<h3>Education</h3>')
for education in profile['education']:
    cv.append(f'<div class="cv-job"><h4>{escape(education["qualification"])}</h4><p>{escape(education["institution"])}</p><p class="cv-period">{escape(education.get("period", ""))}</p></div>')
if profile.get('languages'):
    cv.append('<h3>Languages</h3><p>' + escape(' · '.join(profile['languages'])) + '</p>')
cv.append('<h3>Certificates</h3><ul class="cv-certificates">')
for certificate in certificates:
    cv.append(f'<li><a href="{escape(certificate["verify"])}" target="_blank" rel="noreferrer">{escape(certificate["title"])}</a><br>{escape(certificate["instructor"])} · {escape(certificate["date"])} · {certificate["hours"]} hours</li>')
cv.append('</ul>')

cards = []
card_template = (SRC / 'certificate-card.html').read_text()
for certificate in certificates:
    card = card_template
    for key in ['id', 'title', 'asset', 'recipient', 'instructor', 'iso_date', 'date', 'hours', 'number', 'verify']:
        card = card.replace('__' + key.upper() + '__', escape(certificate[key]))
    translation = (f'<button type="button" data-certificate="{escape(certificate["id"])}" data-certificate-mode="translation">Read in English ↗</button>' if certificate['translation'] else '')
    cards.append(card.replace('__TRANSLATION_BUTTON__', translation))
certificate_section = '<section class="certificates w" id="certificates"><p class="k">Verified course certificates</p><h2>Learning,<br><span class="gr">documented.</span></h2><div class="cert-grid cs">' + ''.join(cards) + '</div></section>'

page = (SRC / 'template.html').read_text()
ai_cards = []
for index, tool in enumerate(ai_tools):
    ai_cards.append(f'<article class="ai-tool-cell" style="--i:{index}"><a class="ai-tool" href="{escape(tool["url"])}" target="_blank" rel="noopener noreferrer" aria-label="Open {escape(tool["name"])} (opens in a new tab)"><span class="ai-tool-index" aria-hidden="true">{index + 1:02}</span><span class="ai-tool-arrow" aria-hidden="true">↗</span><span class="ai-mark ai-mark--{tool["name"].lower()}"><img data-i="{escape(tool["asset"])}" alt="" width="56" height="56" loading="lazy"></span><span class="ai-tool-name">{escape(tool["name"])}</span><span class="ai-tool-maker">{escape(tool["maker"])}</span></a></article>')
ai_section = (SRC / 'ai-toolkit.html').read_text().replace('__AI_TOOL_CARDS__', ''.join(ai_cards))
page = page.replace('<section class="pj w" id="projects">', ai_section + '\n<section class="pj w" id="projects">', 1)
page = page.replace('<a href="#about">About</a>', '<a href="#about">About</a><a href="#ai-stack">AI tools</a>', 1)
page = re.sub(r'<div class="cs"><article class="cc">.*?</div></section>', '</section>' + certificate_section, page, count=1, flags=re.S)
page = re.sub(r'<a class="pill" href="https://kazan\.hh\.ru/resume/[^\"]+"[^>]*>Resume on hh\.ru ↗</a>', '<a class="pill" href="#cv-dialog" data-open-cv>View CV ↗</a>', page)
page = page.replace('<a href="#experience">Experience</a>', '<a href="#experience">Experience</a><a href="#certificates">Certificates</a>')
page = page.replace('<nav>', '<nav id="site-nav" aria-label="Main navigation">', 1)
page = page.replace('</nav></header>', '</nav><button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false">Menu</button></header>', 1)
page = page.replace('ООО «Гиасофт»', 'Giasoft LLC')
timeline = '<div class="tlv">' + ''.join(f'<article class="it{" cur" if n == 0 else ""}"><time>{escape(job["period"])}</time><div><h3>{escape(job["role"])}</h3><p>{escape(job["company"])}</p></div></article>' for n, job in enumerate(profile['experience'][:2])) + '</div>'
page = re.sub(r'<div class="tlv">.*?</article></div>', lambda _: timeline, page, count=1, flags=re.S)
page = page.replace('KNRTU-KAI, Kazan.</p>', 'KNRTU-KAI, Kazan, 2024.</p>')
page = page.replace('<a class="pill" href="#cv-dialog" data-open-cv>View CV ↗</a>', '<a class="pill" href="#cv-dialog" data-open-cv>View CV ↗</a><a class="pill" href="Ernest-Muzafarov-CV.pdf" data-download-cv download="Ernest-Muzafarov-CV.pdf">Download CV ↓</a>')
page = page.replace('</style>', (SRC / 'enhancements.css').read_text() + '\n' + (SRC / 'ai-toolkit.css').read_text() + '\n</style>', 1)
page = page.replace('<script>\n__APP__', (SRC / 'dialogs.html').read_text().replace('__CV_CONTENT__', ''.join(cv)) + '\n<script>\n__APP__')

app = (SRC / 'app.js').read_text()
app = app.replace('__ASSETS__', json.dumps(assets, separators=(',', ':'))).replace('__ARTICLES__', json.dumps(articles, ensure_ascii=False, separators=(',', ':')))
enhancements = (SRC / 'enhancements.js').read_text().replace('__CERTIFICATES__', json.dumps([{k: v for k, v in c.items() if k != 'original_title'} for c in certificates], ensure_ascii=False, separators=(',', ':')))
full_app = app + '\n' + enhancements + '\n' + (SRC / 'ai-toolkit.js').read_text()
page = page.replace('__APP__', script_safe(full_app))
for library in ['gsap.min.js', 'ScrollTrigger.min.js']:
    pattern = r'<script src="https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.5/' + re.escape(library) + r'"></script>'
    page = re.sub(pattern, lambda _: '<script>' + script_safe((ROOT / 'vendor' / library).read_text()) + '</script>', page, count=1)

assert '__APP__' not in page and '__ASSETS__' not in page
assert not re.search(r'href=[\"\'][^\"\']*hh\.ru', page)
assert len(re.findall(r'class="cc cert-card"', page)) == 2
assert '2026-11-04' in page and '2026-05-06' not in page
assert '</body></html>' in page
(DIST / 'index.html').write_text(page)
(ROOT / 'index.html').write_text(page)
shutil.copy2(ROOT / 'assets/Ernest-Muzafarov-CV.pdf', DIST / 'Ernest-Muzafarov-CV.pdf')
if (ROOT / 'CNAME').exists():
    shutil.copy2(ROOT / 'CNAME', DIST / 'CNAME')
(DIST / '.nojekyll').touch()
(ROOT / 'output/pdf').mkdir(parents=True, exist_ok=True)
shutil.copy2(ROOT / 'assets/Ernest-Muzafarov-CV.pdf', ROOT / 'Ernest-Muzafarov-CV.pdf')
(ROOT / 'review/app-check.js').write_text(full_app)
print(json.dumps({'output': str(DIST / 'index.html'), 'bytes': len(page.encode()), 'certificates': len(certificates), 'articles': len(articles), 'hh_links': 0, 'cv_source_status': profile.get('_provenance', {}).get('hh_status')}))
