(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.documentElement.classList.remove('no-js');
  const menu = document.querySelector('.menu-button');
  const navigation = document.querySelector('#navigation');
  menu.hidden = false;
  const closeMenu = () => { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  const media = window.matchMedia('(min-width: 761px)');
  media.addEventListener('change', closeMenu);

  const papers = Array.from(document.querySelectorAll('.publication'));
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const search = document.querySelector('#paper-search');
  const showAll = document.querySelector('.show-all');
  const status = document.querySelector('.result-status');
  let selection = 'all';
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const haystacks = new Map(papers.map(paper => [paper, normalize(paper.textContent)]));
  function updatePapers() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    let hasManuscripts = false;
    for (const paper of papers) {
      const matchesSelection = selection === 'all' || paper.dataset.featured === 'true';
      // A search always searches the full publication list.
      const visible = (terms.length > 0 || matchesSelection) && terms.every(term => haystacks.get(paper).includes(term));
      paper.hidden = !visible;
      if (visible) { count++; if (paper.dataset.manuscript === 'true') hasManuscripts = true; }
    }
    for (const filter of filters) {
      const active = filter.dataset.filter === (terms.length ? 'all' : selection);
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    }
    document.querySelector('.section-aside').textContent = terms.length ? 'Search results' : selection === 'all' ? 'All papers' : 'Selected work';
    status.textContent = `${count} ${count === 1 ? 'paper' : 'papers'} shown${terms.length ? ' for your search' : ''}.`;
    document.querySelector('.empty-state').hidden = count !== 0;
    showAll.hidden = selection === 'all' || terms.length > 0;
    document.querySelector('.manuscript-note').hidden = !hasManuscripts;
  }
  document.querySelector('.publication-toolbar').hidden = false;
  for (const filter of filters) filter.addEventListener('click', () => { selection = filter.dataset.filter; search.value = ''; updatePapers(); });
  search.addEventListener('input', updatePapers);
  showAll.addEventListener('click', () => { selection = 'all'; updatePapers(); filters.find(button => button.dataset.filter === 'all').focus({preventScroll:true}); });
  document.querySelector('#reset-search').addEventListener('click', () => { search.value = ''; updatePapers(); search.focus(); });
  updatePapers();

  const links = Array.from(navigation.querySelectorAll('a'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let ticking = false;
  function updateNavigation() {
    const position = window.scrollY + 150;
    let current = sections[0].id;
    for (const section of sections) if (section.offsetTop <= position) current = section.id;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) current = sections[sections.length - 1].id;
    for (const link of links) {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateNavigation); ticking = true; } }, {passive:true});
  updateNavigation();
})();
