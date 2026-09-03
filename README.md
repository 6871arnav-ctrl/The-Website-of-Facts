# TWoF — The Website of Facts

**Created by Arnav Basu**

TWoF is a data-driven website for surprising, counterintuitive, obscure and fascinating facts across six fields:

1. Space Science & Astronomy
2. History & General Knowledge
3. Physics
4. Biology
5. Mathematics
6. Chemistry


## GitHub Pages

This repository is designed to work as a static GitHub Pages site.

No Node.js, build command or server is required for the public website.

The main entry point is:

`index.html`

GitHub Pages can publish the repository directly once Pages is enabled for the chosen branch/folder.

## Repository structure

- `index.html` — public homepage
- `facts.json` — fact database
- `categories.json` — category definitions
- `metadata.json` — site metadata/editorial principles
- `fact-editor.html` — local fact-authoring utility
- `.github/workflows/validate.yml` — automatic content validation

  It uses a flat structure without any workflow folders to easy the addition of new files.

## Adding facts

The intended workflow is:

`Fact Editor → facts.json → GitHub → automatic validation → GitHub Pages`

The editor is **not a backend**. It runs locally in the browser and exports JSON. This is intentional: no GitHub credentials are exposed in public client-side code.

See `CONTRIBUTING.md`.

## Design philosophy

TWoF should feel like a curated knowledge experience rather than a conventional trivia website.

The content model is designed around:

**Fact → surprise → explanation → deeper connection → rabbit hole**

The long-term architecture can support related facts, images, richer metadata, verification states and additional discovery systems without redesigning the core content model.

## Local preview

Because browsers can restrict `fetch()` when an HTML file is opened directly with `file://`, use a simple local static server if you want to preview the complete site locally.

For example, with Python installed:

`python -m http.server 8000`

Then open the local server address in your browser.

This is only for local preview. GitHub Pages serves the site normally over HTTPS.

## License
This repository uses an MIT License applicable to the code.

## Repository & GitHub Pages

GitHub repository: https://github.com/6871arnav-ctrl/The-Website-of-Facts

Expected GitHub Pages site: https://6871arnav-ctrl.github.io/The-Website-of-Facts/

## Google Form for Submissions of New Facts

**Google Form** for uploading new facts: https://forms.gle/nyXw6moVX3j8dNUUA

