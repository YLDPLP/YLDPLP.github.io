#!/usr/bin/env python3
"""Build a dependency-free static homepage from the publication data."""
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def render_paper(paper):
    title = escape(paper['title'])
    url = paper.get('url', '')
    if url and not url.startswith('https://'):
        raise ValueError(f"Expected a secure publication URL: {paper['id']}")
    title_markup = f'<a href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer">{title}</a>' if url else title
    authors = []
    for author in paper['authors']:
        safe = escape(author)
        if re.match(r'^Long Yang(?:\b|\*)', author):
            safe = f'<strong>{safe}</strong>'
        authors.append(safe)
    venue = paper.get('venue', 'Manuscript')
    manuscript = paper.get('status') in ('manuscript', 'preprint') or any(term in venue.lower() for term in ('manuscript', 'under review', 'submitted', 'preprint'))
    year = paper.get('year') or '—'
    featured = bool(paper.get('featured'))
    summary = f'<p class="pub-summary">{escape(paper["summary"])}</p>' if paper.get('summary') else ''
    link = f'<a href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a>' if url else ''
    labels = {'manuscript': 'Manuscript', 'preprint': 'Preprint', 'accepted': 'Accepted · year not specified'}
    category = f'<span class="pub-type">{labels[paper["status"]]}</span>' if paper.get('status') in labels else ''
    return f'''<article class="publication" id="{escape(paper['id'], quote=True)}" data-featured="{str(featured).lower()}" data-manuscript="{str(manuscript).lower()}">
          <div class="pub-meta"><span class="pub-year">{escape(str(year))}</span><span class="pub-venue">{escape(venue)}</span></div>
          <div class="pub-body"><h3>{title_markup}</h3><p class="pub-authors">{', '.join(authors)}</p>{summary}<div class="pub-links">{link}{category}</div></div>
        </article>'''


def main():
    data = json.loads((ROOT / 'publications.json').read_text(encoding='utf-8'))
    papers = data if isinstance(data, list) else data['publications']
    ids = [paper['id'] for paper in papers]
    assert len(set(ids)) == len(ids), 'Duplicate publication IDs'
    assert all(paper.get('title') and paper.get('authors') for paper in papers)
    papers = sorted(papers, key=lambda paper: int(paper.get('year') or 0), reverse=True)
    template = (ROOT / 'source' / 'index.template.html').read_text(encoding='utf-8')
    page = template.replace('{{PUBLICATIONS}}', '\n        '.join(map(render_paper, papers))).replace('{{PAPER_COUNT}}', str(len(papers)))
    assert '{{' not in page, 'Unresolved template marker'
    (ROOT / 'index.html').write_text(page, encoding='utf-8')
    print(f'Built index.html: {len(papers)} papers, {sum(bool(p.get("featured")) for p in papers)} featured.')


if __name__ == '__main__':
    main()
