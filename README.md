# POSTECH AeroSpace Initiatives

The bilingual PSI website: [English](https://postech-psi.github.io/psi-website/) · [한국어](https://postech-psi.github.io/psi-website/ko/index.html).

Eleven pages in each language cover the club, PSLV, Avionics, TMS, current and historical research, learning, news, an event photo archive and joining PSI. The interface uses the club's identity, authentic field photography/video and self-hosted Pretendard. Project descriptions distinguish implemented, configured and verified behavior, with links to pinned repositories and the actual [test-results portal](https://postech-psi.github.io/test-results/).

## Edit and preview

The editable source is `docs/launch-site/`, not the generated root HTML. Content is in `content.mjs`, `current-research.mjs` and `gallery-data.mjs`; layout is in `templates.mjs` and `engineering-pages.mjs`; styling and interaction are in `site.css` and `site.js`. See [the source guide](docs/launch-site/README.md) for media provenance and detailed behavior.

```sh
node docs/launch-site/build.mjs
python -m http.server 8767 --bind 127.0.0.1 --directory docs/launch-site
```

Open `http://127.0.0.1:8767/ko/index.html`. The English entry is `/index.html`.

## Verify and export

With the preview server running:

```sh
node docs/launch-site/check.cjs
node docs/launch-site/check-assets.mjs
node tools/check-release.mjs
node tools/export-launch-site.mjs
```

The browser checks currently use the original development machine's bundled Playwright installation and Edge. Adjust that dependency path for another machine. `PSI_URL` can point the checks to an exported local staging directory; all paths work beneath `/psi-website/`. The Node-only build and export checks have no package dependencies.

The exporter verifies generated HTML against the renderer and copies only public pages, runtime files, referenced media and the font license. `release.json` records deterministic SHA-256 digests. Tests, review files, source manifests, internal documents and removed spring-event media are not exported. Unrelated root files are preserved; an unowned or hand-modified destination is rejected. Make edits in the source and re-export, rather than editing root output.

## Deployment

GitHub Pages uses the existing `main` branch/root Jekyll configuration. Commit the verified source **and** root export, then push `main`. The `pages build and deployment` workflow must finish successfully, and the public `release.json` revision must match the local one before considering a release deployed.

Legacy source Markdown is retained but conflicting pages are excluded in `_config.yml`. Old Team, Events and Contact addresses redirect to About, News and Join. The existing Jekyll Shop, layouts and shop assets remain available at `/shop`; no checkout or fulfillment behavior was changed.

To preview the complete Jekyll output, including Shop, use the existing `Gemfile`: `bundle install` then `bundle exec jekyll serve`. Source-only static previews do not render the legacy Shop.

## Recovery

Before a release, record the current remote `main` SHA. If an essential route, navigation, theme or media flow fails after deployment, inspect the Pages workflow and failed request first. A rollback is a normal Git revert of the release commits followed by a regular push; never reset or force-push shared history. The last pre-redesign production commit was `076d52832c77c4c7d8747a3ee7625a6b677767b1`.

Original files and the isolated design worktree are retained for recovery. Older generated visuals remain only as legacy assets; the redesigned pages use the real PSI media.
