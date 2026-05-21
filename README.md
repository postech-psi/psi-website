# POSTECH AeroSpace Initiatives Website

This repository contains the Jekyll/GitHub Pages website for POSTECH AeroSpace Initiatives (PSI), a student aerospace research club at POSTECH.

The current site is a static bilingual public website with:

- Korean and English content switching
- Persistent language and theme preferences
- Project pages for avionics, thrust measurement, and sounding rocket work
- Generated temporary aerospace visuals under `assets/images/generated/`
- A lightweight audit script for encoding, links, metadata, assets, and basic source checks

## Local Development

Install dependencies:

```bash
bundle install
```

Serve locally:

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000/psi-website/`.

## Audit

Run the static audit harness:

```bash
node tools/audit-site.js
```

The audit checks source encoding symptoms, common mojibake sequences, internal links, image references, metadata, bilingual markers, and generated asset presence.

## Generated Asset Convention

Temporary AI-generated visuals live in:

```text
assets/images/generated/
```

Current files:

- `psi-hero-launch.png`
- `avionics-lab.png`
- `propulsion-test.png`

When real PSI photos or videos are available, replace references in the Markdown pages or add new files beside these assets. Keep descriptive filenames and meaningful `alt` text.

## Deployment

The site is configured for GitHub Pages and keeps the existing static URL structure. Push to the configured Pages branch to deploy.
