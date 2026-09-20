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

### Task 2: Audit and simplify all English and Korean website copy

**Added scope:** User explicitly invoked `avoid-ai-writing` and asked for full wording/sentence cleanup, including unnecessary headings. Read the named skill at `C:/Users/tae06/.codex/skills/avoid-ai-writing/skills/avoid-ai-writing/SKILL.md` and its complete referenced pattern catalog. Use its default two-pass limit across all this task's edits; audit/checks do not consume a pass. No new approval pause is needed.

**Files:** editable copy literals in docs/launch-site/{templates,content,program-pages,engineering-pages,current-research,gallery-data,reel-view,archive-view,test-results-view,telemetry-view}.mjs and site.js/telemetry.mjs as actually present; any additional public-facing renderer discovered by the source inventory. Generated HTML is rebuilt, never manually edited. Update wording-dependent tests without dropping scientific/interaction coverage. Keep charts/vendor/upstream datasets/source-lock unchanged. Add a focused copy-preservation regression and a prose-only audit artifact under this plan workspace.

**Editorial scope:** all eight canonical routes in EN/KO, expanded native disclosures, headers/footer, photo captions/alt text, menus/buttons/control names, errors/loading/empty states, metadata and five compatibility-page notices. Check every distinct public-facing string even when it needs no change. Preserve attributed paper titles, people names/roles, source IDs/links, numeric values/units/conditions, dates and source confidence. Keep necessary technical terminology and scientific caveats. Do not fabricate personal experience, generic enthusiasm, capabilities or test outcomes. Shorten redundant framing and remove unnecessary headings/sentences as explicitly requested, while retaining accessible document hierarchy and content ownership.

- [ ] Inventory/extract before prose for both languages; keep original snapshots and a route/source coverage checklist. Review prose detached from code; never run a prose rewriting/normalizer tool over whole JS/HTML/config/generated data.
- [ ] Audit under the canonical patterns, with technical/docs exceptions for engineering prose. Korean is contextual model review; do not present English detector output as a Korean quality/authorship score. Record justified findings with before/after/source and retained protected/intentional findings. A detector match is not an automatic edit.
- [ ] Write a focused red regression for selected actual filler plus protected facts/values before applying the first editorial pass. Apply all justified initial changes as one pass, including heading/paragraph simplification and quote normalization of only changed prose. Run the skill's marks normalizer against prose-only scratch and the original reference; safely reinsert exact reviewed copy literals.
- [ ] Build and extract after prose; run detector/preservation validator where supported. Record actual results, including expected heading changes authorized by the user rather than hiding validator failures. Verify facts, links, numbers, units, IDs and source dataset hashes through deterministic structured checks plus contextual review. Review differences; reserve at most one corrective pass for justified editorial or preservation fixes. Stop at two and report residuals honestly.
- [ ] Run relevant copy/navigation/structure/engineering/supporter/result checks, then full check.cjs once on final content; inspect longest/shortest affected layouts in both languages at390/1440, both themes. Original graph engine/data must remain unchanged. Report actual editorial pass count, deterministic versus model-only checks, preservation status and stop reason.
- [ ] Commit only task source/tests/generated changes; no root export/merge/push. Write `.superpowers/sdd/2026-09-20-simple-navigation/task-2-report.md` and return the short SDD status contract.

Task1 produces the canonical owners/IDs/interaction structure consumed by Task2. Task2 changes prose only, except explicitly authorized removal of empty heading/paragraph wrappers with no lost links or semantics. Controller then runs task and whole-branch review and the authorized release; never publish the pre-copy-cleanup candidate while Task2 remains open.
