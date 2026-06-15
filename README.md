# POSTECH AeroSpace Initiatives Website

This repository contains the Jekyll/GitHub Pages website for POSTECH AeroSpace Initiatives (PSI), a student aerospace research club at POSTECH.

The current site is an English-first public website with:

- A rebuilt technical visual system inspired by student aerospace and robotics teams
- Mission, project, team, trajectory, and join pages
- Project dossiers for avionics, thrust measurement, and sounding rocket work
- Generated temporary aerospace visuals under `assets/images/generated/`
- A lightweight audit script for encoding, links, metadata, assets, navigation, and basic source checks

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

The audit checks source encoding symptoms, common mojibake sequences, internal links, image references, metadata, navigation, and generated asset presence.

## Generated Asset Convention

Temporary AI-generated visuals live in:

```text
assets/images/generated/
```

Current files:

- `psi-hero-range-v2.png`
- `psi-hero-launch.png`
- `avionics-lab.png`
- `avionics-macro-bay.png`
- `propulsion-test.png`
- `ground-station-workshop.png`

When real PSI photos or videos are available, replace references in the Markdown pages or add new files beside these assets. Keep descriptive filenames and meaningful `alt` text.

## Deployment

The site is configured for GitHub Pages and keeps the existing static URL structure. Push to the configured Pages branch to deploy.
