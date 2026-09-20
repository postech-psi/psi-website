# Simple Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace PSI's cross-linked engineering mini-sites with direct, animated in-page experiences.
**Architecture:** One coherent navigation integration task because redirects, embedded graphs, galleries, links and regression selectors share the same route contract. Reuse existing data/renderers, extract focused composition and motion modules where needed, keep compatibility endpoints outside visible navigation.
**Tech Stack:** Static Node ES-module renderer, native HTML details, CSS/Web Animations, existing ECharts source port, Playwright Edge.
**Spec:** `docs/superpowers/specs/2026-09-20-simple-navigation.md`.

## Global Constraints

- Preserve original test-results implementation and pinned numerical data; no recalculation or chart substitute.
- Five main nav destinations in both languages; eight primary routes including Home and two project details, with five compatibility routes retained.
- No private URLs/raw manuscripts, invented outcomes/team information, spring MT, NURA leadership or lost supporter logos/Finance wording.
- Bilingual/static GitHub Pages, including /psi-website/ and /ko/, no-JS fallbacks, full legacy redirect map, theme and accessible focus.
- Preserve official neutral palette, Pretendard, original logos and authentic photos. Reduced motion removes transitions/autoplay, not access to content.
- Work in the existing launch-site worktree; preserve untracked artifacts. Implementer does not merge/push or export repository root.

### Task 1: Consolidate navigation and animate the in-page experiences

**Files:** modify docs/launch-site/{content,templates,program-pages,engineering-pages,reel-view}.mjs; site.js/site.css/program-pages.css; relevant check-*.cjs and tools/check-release.mjs. Create focused composition/motion modules if it reduces large template complexity; wire fingerprints and explicit export in tools/export-launch-site.mjs. Rebuild all generated routes. Keep immutable results snapshot unchanged; if integration loader/mount changes, source lock and deterministic adaptations must remain reproducible, and changed runtime dependencies need content-versioning.

**Interfaces:** `engineeringPage(page,lang,asset)` currently renders full chapters and h1. Adapt or add an embedded entry point so PSLV owns the same content without a duplicate h1/back-link/footer. `testResultsView(lang,asset)` owns original results and static fallback. `trialHref(id)` becomes canonical PSLV test deep link. Existing gallery data/lightbox/reel stay authoritative. Maintain valid IDs for flight-record, test-results and old chapter fragments; reveal ancestor disclosures before scrolling/mount/resize.

- [ ] Write `check-simple-navigation.cjs` first. Observable targets include:
```js
await page.goto(base+'/ko/pslv.html');
assert.equal(await page.locator('.site-nav a').count(),5);
const originalPath=new URL(page.url()).pathname;
await page.locator('[data-system="avionics"] > summary').click();
assert.equal(new URL(page.url()).pathname,originalPath);
assert.ok(await page.locator('[data-system="avionics"] [data-architecture-flow]').isVisible());
await page.locator('[data-system="tms"] > summary').click();
await page.locator('[data-results-status="ready"]').waitFor({state:'attached'});
assert.ok(await page.locator('#dt-canvas-thrust canvas').isVisible());
assert.equal(await page.locator('h1').count(),1);
```
Cover both languages, redirects retaining `?test=2026-04-08-combustion#test-results`, old Avionics fragments, News gallery lightbox without document navigation, About participation, no exposed obsolete routes, no-JS disclosure/source results, actual animation objects and reduced-motion behavior. Observe expected failures, not missing browser setup.
- [ ] Implement unified PSLV system disclosures, simplify shared chrome and crosslinks, embed News gallery and About join/education, generate compatibility redirects with safe query/fragment preservation. No dead ends/loops. Preserve meaningful engineering content, all tests/facts and source attribution; remove user-identified filler and repetitive promotion.
- [ ] Add focused motion module or scoped existing handlers: program photo/copy switch, robust disclosure open/close animation, gallery transition, theme/menu state animation. Controls are native/keyboard operable with proper state; fast interactions cancel old animations and settle cleanly. Keep hero/reel pause and image proportions.
- [ ] Migrate existing tests that intentionally assumed the former destinations: test real canonical content and compatibility redirects rather than deleting coverage. Original result parity still compares every source sample/options. Update export route test from hardcoded22 to actual complete routes. Add route fingerprint/dependency inclusion checks for new runtime assets.
- [ ] Build and run focused tests; then full check.cjs, check-structure.cjs, original results parity, snapshot/asset checks, check-release staging. Default actual preview server is8870; `PSI_URL=http://127.0.0.1:8870`, `PSI_BROWSER_CHANNEL=msedge`. Tests may launch own static servers.
- [ ] Inspect representative Home/Projects/PSLV open+closed/News/About screenshots in EN/KO/light/dark at390 and1440; full overflow320/390/768/1440. Report actual motion and graph dimensions after disclosure. Commit task-only source/test/generated files; report RED/GREEN commands/output and screenshots.

Controller then independently audits link topology and the actual static export, runs task/final reviews, fixes findings through the implementer, and executes already-authorized normal GitHub Pages release with live checks. User's request to implement now supersedes another plan-choice/approval prompt.
