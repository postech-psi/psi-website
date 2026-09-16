# Current engineering and research — Task 1

Completed 17 September 2026 in `codex/launch-site`, based on `2b6f330`. Local preview remains `http://127.0.0.1:8766/`; no deployment, push, production-route change or private-paper publication.

## Delivered

- Five complete bilingual current studies in `current-research.mjs`, with the specified record interface. Each has its research question, method, achieved stage, next validation step and exact Korean/English manuscript titles. Stage limitations remain visible while native details are closed.
- Current research and the 15 historical records are separate sections. All historical filters continue to operate only on the historical archive. Native expansion works with keyboard and without JavaScript.
- The obsolete April selection section is replaced by links to the current studies. Home has a current-research invitation; historical home previews remain explicitly dated 2025. The research page has current/archive jump links.
- Avionics now describes the pinned `7cfb5be044e539c2e3c6d79a6538416a2741cd67` dual-core firmware and integrated ground station. M7, M4, UKF, GNSS and logging/telemetry responsibilities are distinguished. Configured rates and sensor-health limitations are adjacent to their claims.
- TMS description and dated test plot are retained; repository link is pinned to verified `abb02a09bca4e7835425dc67b2c28234ef887992`.
- No motion, gallery or telemetry replay implementation in this task. No JavaScript feature changes were needed.

## Source and editorial boundaries

Read the plan/spec and all four root research notes: `repo-refresh-2026-09-17.md`, `current-research-papers-2026-09-17.md`, `current-research-team2-2026-09-17.md`, and `current-research-teams45-2026-09-17.md`. Current manuscripts are ongoing work, not accepted/published results. The copy distinguishes simulation, prototype work, planned validation and demonstrated outcomes. Team 2 does not claim statistically confirmed improvement; Team 3 does not claim free-flight VTVL; Team 4's 120 N is a design class; Team 5 is tail-fin, not the superseded canard topic. No operational thresholds, private URLs, raw papers or coordinates were added.

The frontend-design skill informed the editorial index rather than a repeated card wall. After root visual feedback, the duplicate research introductions were consolidated: one page introduction, compact ongoing status, then the actual studies. Body type was not reduced. TDD supplied the missing-content and first-viewport regression checks; verification-before-completion required the fresh successful runs below.

## Verification commands and actual results

Commands below ran from `C:/Users/tae06/CODE/psi-website/.worktrees/launch-site` in PowerShell with fresh isolated headless Edge, never the root's visible browser.

Initial RED, before production changes:

```powershell
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/check-current-content.cjs
```

Exit 1 as intended: both locales had zero current records instead of five, the current Avionics M7 assertion failed against the old description, and no-JavaScript current-record checks failed. Existing overflow checks passed.

After the first implementation this command passed. Root then identified duplicated introductory blocks pushing real content down. Added the 1000 × 792 first-study regression and ran the same command again: exit 1 in both locales because the first study heading began after 520 px. After the research-only hierarchy adjustment, the command passed in both locales, including first heading before 520 px and stage beginning inside the initial viewport.

Final build and focused GREEN:

```powershell
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/build.mjs
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/check-current-content.cjs
```

Exit 0. Built all 16 routes. Passed five exact current titles, visible stage boundaries, native keyboard expansion, method/next content, 15 historical records and award/reset filtering, current records unaffected by filters, private-link checks, current Avionics/pinned TMS sources, absence of the stale selection list, light/dark overflow at 320/390/768/1440 px, and no-JavaScript reading in both languages.

Final full GREEN:

```powershell
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/check.cjs
```

Exit 0 after the hierarchy adjustment. This includes `check-homepage.cjs`, `check-current-content.cjs`, `check-accessibility.cjs` and the existing 16-route/four-width suite: theme persistence, language parity, archive filters, mobile menu/Escape, intentional media switching/playback, video keyboard focus and pause, hardware tabs, fonts/images and browser errors. Existing caption/link contrasts remained 5.57/5.39 in light and 7.26/6.32 in dark.

Visual capture and link checks:

```powershell
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/review/current-content-visual.cjs
& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' docs/launch-site/review/links.mjs
git diff --check
```

All exit 0. Generated 24 research-opening, expanded-study and Avionics captures across EN/KO, 390/1440 px and light/dark. Inspected actual desktop and mobile images, including the expanded study and current architecture. The index remains readable, stage callouts are adjacent, original titles wrap, and neither layout has horizontal overflow. Link audit: 16 pages, 358 local links, zero failures. Screenshot outputs are local review evidence, not committed site assets.

## Remaining scope

The next phase owns film motion, event gallery and real telemetry replay. Current paper manuscripts remain private; their on-page summaries do not imply publication. No external endpoint uptime, hardware performance, manuscript results or flight qualification is established by these UI tests. Root-owned media, specs and review artifacts were left untouched and excluded from this commit.
