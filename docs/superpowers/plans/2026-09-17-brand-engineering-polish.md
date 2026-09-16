# PSI Brand and Engineering Polish Implementation Plan

Completed locally at application commit `756fdd0`; independent review findings closed and final root full suite passed. Detailed evidence is recorded in `docs/launch-site/review/brand-engineering-final-review.md`. No merge, push or deployment.

> **For agentic workers:** Use superpowers:subagent-driven-development with one application writer and independent review. The user's autonomous-iteration request supersedes a repeated execution-choice pause.

**Goal:** Deliver a logo-coherent, more polished PSI site with icon theme controls, substantive Avionics/TMS case studies and first-class use of the real test-results portal.

**Architecture:** Retain the static generator and progressive JavaScript. Add two page renderers in a focused engineering module instead of extending the already long general template; preserve existing overview anchors and media/data contracts.

**Tech Stack:** Existing Node standard-library build, HTML/CSS, vanilla JS and bundled Playwright/Edge; no framework or animation dependency.

**Spec:** `docs/superpowers/specs/2026-09-17-brand-engineering-polish.md`.

## Global constraints

- Base `17f4555973e7bbc920fe7a7698d4df9fbc299428`, existing isolated `codex/launch-site` worktree; no push, merge or deployment.
- Preserve actual logo artwork, documentary photos and plot colours; neutral UI tokens exactly as in the spec.
- Keep body text at least18px, visible focus and reduced-motion/manual media contracts.
- One application writer; root owns `review/*` acceptance scripts and prepares any approved font specimen inputs separately.
- Five current studies,15historical records,6events/14photos,343samples/7gaps and all source/privacy boundaries survive.

## Task 1 — Brand, hierarchy and icon preference

**Files:** modify `docs/launch-site/site.css`, `site.js`, `templates.mjs`, generated HTML and applicable existing theme tests; create `docs/launch-site/check-brand.cjs`. Font assets only if the root-approved actual-heading comparison favours a change.

**Interface:** `[data-theme-select]` remains a native select with `system`, `light`, `dark`; wrapper `[data-theme-control]`; decorative SVGs `[data-theme-icon="system|light|dark"]`; HTML `data-theme-choice` reflects preference and `data-theme` reflects resolved theme. Logo src stays `assets/psi-logo.png` with source dimensions unchanged.

- [x] Add RED browser assertions before implementation: neutral token channels (`max(rgb)-min(rgb)<=2`), icon wrapper exists and is≥44×44, exactly one current-preference icon is visible, no visible text dropdown, logo≥140px desktop/90px mobile, colour meta matches resolved canvas.
- [x] Run `node check-brand.cjs` on the existing site and record the observed missing icon/blue palette failure.
- [x] Implement tokens, remove remaining hard-coded navy UI fills/shadows, improve header/wordmark scale and common type/spacing hierarchy. Preserve full-frame photos and existing interactions; do not shrink body text to hide overflow.
- [x] Implement native icon preference. Core state contract:

```js
document.documentElement.dataset.themeChoice = theme;
document.documentElement.dataset.theme = theme === 'system'
  ? (systemTheme.matches ? 'dark' : 'light') : theme;
```

Use CSS to show the selected preference icon and a visible wrapper ring when the overlaid select is focus-visible; update initial theme and meta colour using the same palette. Keep options localized.
- [x] Assert storage/reload, changing OS preference, explicit override, native keyboard interaction, icon/control bounds at320/390/901/1440 and visible forced-colours focus. Update old exact-blue theme expectations, not unrelated assertions.
- [x] Build, run focused and full existing suites, inspect real header/hero/research/charts in both locales/themes. Commit scoped Task1, report exact tests and screenshots.

## Task 2 — Engineering case studies and real results portal

**Files:** create `engineering-pages.mjs`, `check-engineering.cjs`; modify `content.mjs`, `templates.mjs`, `build.mjs`, `site.css`, related tests, README and22generated routes. Consume `telemetry-view.mjs`/`telemetry.mjs` without altering received data.

**Interfaces:** `engineering-pages.mjs` exports `engineeringPage(page,lang,asset)` returning the inner main HTML for `page` in `avionics|tms`. Use existing bilingual `{en,ko}` records where appropriate. Sections carry stable IDs `architecture`, `estimation`, `ground-station`, `flight-record` for Avionics; `instrument`, `processing`, `test-results` for TMS. Overview `projects#avionics` and `projects#tms` remain. `sources.testPortal` is the real Pages root; `sources.tests` remains the source repository. Each test record has distinct `url` (HTML detail) and `sourceUrl` (underlying Markdown).

- [x] Read all three required source/reference notes. Map each engineering claim/diagram edge to a pinned public source; preserve configured/measured and planned/validated distinctions.
- [x] Add RED tests for both new routes and locales, Projects-current navigation, new locale-switch destinations, chapter IDs, readable M7/M4/GNSS separation, offline TMS processing limits, primary portal link and four HTML result links. For example:

```js
assert.equal((await page.goto(`${base}/ko/tms.html`)).status(), 200);
assert.ok(await page.locator('a[href="https://postech-psi.github.io/test-results/"]').count());
assert.equal(await page.locator('[data-test-result]').count(), 4);
```

- [x] Write substantive bilingual case-study copy and a source-labelled semantic M7/M4 responsibility diagram. Render all factual content statically; no fake live dashboard or decorative pseudo-circuit. Use clear chapters, useful local anchors and concise summaries before deeper content.
- [x] Move the real recorded player to `avionics.html#flight-record`, keep a Projects preview/link and migrate app-owned tests to its new canonical route. Data, eight SVG paths, keyboard, actual cursor and fallback assertions remain intact.
- [x] Make TMS portal the prominent destination on home/TMS; use verified HTML test-detail links in date/news/results rows. Include reported thrust/impulse with their dates/units and limits. Keep original-record/source links subordinate; retain July and April3 caveats. Use the honestly dated existing April8 figure unless a separately verified latest figure is prepared.
- [x] Update build/navigation/title/locale/module-loading contracts and22route tests/README. Build and run `check-engineering.cjs`, brand, motion/gallery/replay, source-content and full suites. Verify local links and screenshot overview plus complete case-study chapters desktop/mobile. Commit Task2 and report.

## Task 3 — Independent polish and acceptance

**Files:** root review scripts/reports, bounded implementer fixes only.

- [x] Migrate root audit route lists to22 and replay canonical route toAvionics without removing substantive assertions; preserve all legacy anchor checks.
- [x] Independent committed-delta source/spec review and code review. Original implementer fixes concrete Important findings using failing regression checks; reviewers rereview only the affected areas.
- [x] Root runs complete static-site and interaction/data/privacy/media/link checks. Inspect actual logo/header/icon, home, engineering overview, Avionics flow/replay and TMS portal entry at320/390/901/1440 and both themes/locales.
- [x] Verify actual in-app preview, preserve local-only boundary, update decision/verification records and leave the finished homepage open. Report implemented outcomes and honest source/device limitations.

## Plan self-review

Brand/logo/icons/hierarchy map to Task1; substantive source-backed content and actual portal to Task2; preserved existing contracts and final inspection to Task3. Source notes and canonical selectors are explicit. Root's finite font comparison is an input, not a requirement to adopt a new family. No new backend, deployment, iframe dependency or generic motion library is introduced.
