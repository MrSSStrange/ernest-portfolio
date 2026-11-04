"""Create the English downloadable CV from the same data used by the website."""
from pathlib import Path
import html
import json
import shutil
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from cv_data import cv_source_digest

ROOT = Path(__file__).resolve().parent
PROFILE = ROOT / 'src/profile.json'
CERTIFICATES = ROOT / 'src/certificates.json'
OUT = ROOT / 'output/pdf/Ernest-Muzafarov-CV.pdf'
GREEN = colors.HexColor('#245e3b')
INK = colors.HexColor('#171c19')
GRAY = colors.HexColor('#5c675e')


def clean(value):
    return str(value).replace('\u2014', '-').replace('\u2013', '-').replace('\u2011', '-').replace('\u2019', "'").replace('\u2018', "'")


def esc(value):
    return html.escape(clean(value), quote=True)


def build_cv():
    profile = json.loads(PROFILE.read_text())
    certificates = json.loads(CERTIFICATES.read_text())
    OUT.parent.mkdir(parents=True, exist_ok=True)
    styles = {
        'name': ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=29, leading=32, textColor=INK, spaceAfter=7),
        'headline': ParagraphStyle('Headline', fontName='Helvetica', fontSize=13, leading=17, textColor=GREEN, spaceAfter=9),
        'body': ParagraphStyle('Body', fontName='Helvetica', fontSize=9.3, leading=13.2, textColor=INK, spaceAfter=5),
        'contacts': ParagraphStyle('Contacts', fontName='Helvetica', fontSize=8.8, leading=13, textColor=GREEN, spaceAfter=3),
        'section': ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=GREEN, spaceBefore=15, spaceAfter=7, keepWithNext=True),
        'job': ParagraphStyle('Job', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=INK, spaceBefore=10, spaceAfter=3, keepWithNext=True),
        'meta': ParagraphStyle('Meta', fontName='Helvetica', fontSize=8.6, leading=12, textColor=GRAY, spaceAfter=5, keepWithNext=True),
        'bullet': ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9.1, leading=12.6, textColor=INK, leftIndent=10, firstLineIndent=-8, spaceAfter=3),
        'level': ParagraphStyle('Level', fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=INK, spaceBefore=7, spaceAfter=4, keepWithNext=True),
        'pageTitle': ParagraphStyle('PageTitle', fontName='Helvetica-Bold', fontSize=23, leading=28, textColor=INK, spaceAfter=5),
    }
    story = []

    def p(text, style='body'):
        return Paragraph(esc(text), styles[style])

    def section(title):
        story.append(p(title.upper(), 'section'))

    story += [p(profile['name'], 'name'), p(profile['headline'], 'headline')]
    contacts = profile['contacts']
    links = [f'<link href="mailto:{esc(contacts["email"])}" color="#245e3b">{esc(contacts["email"])}</link>']
    for key, label in [('telegram', 'Telegram'), ('github', 'GitHub'), ('linkedin', 'LinkedIn')]:
        if contacts.get(key):
            links.append(f'<link href="{esc(contacts[key])}" color="#245e3b">{label}</link>')
    story.append(Paragraph(' &nbsp; | &nbsp; '.join(links), styles['contacts']))
    section('Profile')
    story.append(p(profile['summary']))
    section('Experience')
    for job in profile['experience']:
        story += [p(job['role'], 'job'), p(job['company'] + ' | ' + job['period'], 'meta')]
        for detail in job.get('details', []):
            story.append(p('- ' + detail, 'bullet'))

    story.append(PageBreak())
    story += [p('Skills & applied automation', 'pageTitle'), p(profile['name'] + ' | ' + profile['headline'], 'meta')]
    section('Skills')
    for group in profile['skill_groups']:
        story.append(KeepTogether([p(group['level'], 'level'), p(' / '.join(group['skills']))]))
    if profile.get('ai_tools'):
        story.append(KeepTogether([p('AI tools used in daily work', 'level'), p(' / '.join(profile['ai_tools']))]))
    if profile.get('additional_skills'):
        story.append(KeepTogether([p('Additional automation tools', 'level'), p(' / '.join(profile['additional_skills']))]))

    section('Selected automation work')
    for project in profile['projects']:
        story.append(KeepTogether([p(project['name'], 'level'), p(project['description']), p(project['result'])]))
    section('Education & languages')
    for education in profile['education']:
        story += [p(education['qualification']), p(education['institution'] + ' | ' + education['period'], 'meta')]
    for language in profile.get('languages', []):
        story.append(p(language))
    section('Certificates')
    for certificate in certificates:
        title = f'<link href="{esc(certificate["verify"])}" color="#245e3b">{esc(certificate["title"])}</link>'
        detail = certificate['instructor'] + ' | ' + certificate['date'] + ' | ' + str(certificate['hours']) + ' hours'
        story.append(KeepTogether([Paragraph(title, styles['body']), p(detail, 'meta')]))

    def footer(canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor('#ccd6cb'))
        canvas.setLineWidth(.6)
        canvas.line(43, 35, width - 43, 35)
        canvas.setFillColor(GRAY)
        canvas.setFont('Helvetica', 8)
        canvas.drawString(43, 22, 'Ernest Muzafarov | AI Engineering & Automation')
        canvas.drawRightString(width - 43, 22, str(doc.page))
        canvas.restoreState()

    doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=43, leftMargin=43, topMargin=39, bottomMargin=47,
                            title='Ernest Muzafarov - AI Engineering & Automation', author='Ernest Muzafarov',
                            subject='CV: experience, skills, automation, education and certificates', pageCompression=1)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    shutil.copy2(OUT, ROOT / 'assets/Ernest-Muzafarov-CV.pdf')
    source_hash = cv_source_digest(PROFILE, CERTIFICATES)
    (ROOT / 'assets/cv-source.sha256').write_text(source_hash + '\n')
    print(str(OUT))


if __name__ == '__main__':
    build_cv()
