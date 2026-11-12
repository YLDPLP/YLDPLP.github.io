# Long Yang — Academic Homepage

An English academic homepage for Long Yang, Co-founder and Chief Scientist at Shenzhen DeepLeap Technology Co., Ltd.

The site is a lightweight static website designed for GitHub Pages. It includes a profile, education and professional experience directly below the introduction, research interests, searchable publications, and contact information. The responsive sidebar and single-page structure are inspired by [Yige Yuan's homepage](https://yuanyige.github.io/); the implementation and styling are original.

## Open locally

Open `index.html` directly in a browser. No installation or build step is required to view the site. All fonts, scripts, styles, and images work without third-party CDN dependencies.

For a local preview server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update content

- Edit `source/index.template.html` to update the biography, experience, education, and contact details.
- Edit `publications.json` to add or update papers. Set `featured` to `true` for papers shown when visitors choose the Selected filter. All papers are displayed by default.
- Run `python3 source/build.py` to regenerate `index.html` after changing either file.
- Edit `assets/style.css` for appearance and `assets/site.js` for navigation and publication search.
- Replace `assets/long-yang.jpg` to change the portrait.

The complete publication list is embedded in HTML for indexing and for visitors who disable JavaScript. Searching checks all papers, including those outside the optional Selected filter. Papers are ordered by year; manuscript status is kept separate from verified publication venues.

## Publish on GitHub Pages

Use the repository `YLDPLP/YLDPLP.github.io`. In **Settings → Pages**, choose **Deploy from a branch**, branch **main**, and folder **/(root)**. The intended public address is **https://yldplp.github.io/**.

The `.nojekyll` file enables direct static-file publishing. No secret, password, account token, analytics service, or build dependency is included in this website.

## Content sources

- Biography, employment, education, and portrait: provided by Long Yang in November 2026.
- Company English name: confirmed by Long Yang as Shenzhen DeepLeap Technology Co., Ltd.
- Employment titles and dates at CAS and Peking University follow the LinkedIn text, explicitly confirmed by Long Yang to supersede the earlier biography screenshot.
- LinkedIn profile URL and additional career details: supplied directly by Long Yang after LinkedIn restricted automated access. These include the co-founder role, DELE world-model research, internship experience, and degree subjects.
- Publication entries: supplied publication list, with publication links and later venue information checked against scholarly sources where available. Verification details are retained in `publications.json`.
- University names follow official institutional English names. Tiangong University's former name is included to clarify the historical education record.

The list is a selection of supplied papers, not a claim to be a complete bibliography. No unprovided awards, advisor names, review service, or personal social accounts have been added.
