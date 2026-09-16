# Task 2 — Engineering case studies and public results

## Final review follow-up — transmission responsibility

Task 2 implementation commit: `d3a2a5fc4601fd1d46cdb66231bf413a5f69806f`. Independent review identified one narrow English source-semantic correction. Parent verified pinned M7 lines 231–280: `ipcSendData`/`ipcSend` assemble and enqueue messages, while `txThreadFn` pops them and calls `RPC.write`. The text now says the separate transmission thread **forwards** framed messages containing measurements/status, rather than claiming the thread packages them. Korean wording already described sending and is unchanged. No architecture, behavior, data, style or other copy changed.

The requested rendered-copy regression was added before the correction. From `docs/launch-site`, exact executable invocation prefix was `& 'C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'`:

- RED `check-engineering.cjs`, exit 1: `en/ Avionics chapters and source boundaries: Transmission thread forwards queued frames; it does not assemble them`.
- GREEN `build.mjs`, exit 0: `Built 22 PSI pages in docs/launch-site.`
- GREEN `check-engineering.cjs`, exit 0: all 14 EN/KO groups passed, including source boundaries, figures/results, anchors, four widths/two themes and static content.
- GREEN `review/links.mjs`, exit 0: `pages: 22`, `checkedLocalLinks: 564`, `failures: []`.
- `git diff --check`, exit 0. Only the source sentence, generated English Avionics sentence, focused assertion and this report are in the follow-up delta. The receiving-code-review and TDD skills informed verification and the requested RED/GREEN sequence. No new visual-design claim; ownership released after scoped commit.

Base: `34737da9fa3cccbdf72a9213470e273161e936b1`. Local review only; no deployment, push, main-branch operation or user-browser interaction.

## Delivered

- Dedicated bilingual Avionics and TMS chapters, 22 generated routes. Projects retains both established anchors as concise previews; new pages retain Projects-current navigation and matching locale links.
- Avionics has a semantic four-stage software-responsibility diagram, measurements/estimates and health boundaries, onboard/received logging distinctions and the integrated ground-station explanation. The existing recorded player now has one canonical home at `avionics.html#flight-record`; no telemetry code or data was changed.
- TMS explains acquisition, calibration, reconstructed timing and offline processing. Home/TMS lead to the real Pages portal; four dated HTML result links have separate original-note links. July pressure and April 3 apparatus/fire/corrosion caveats remain visible.
- Root-approved full-frame WebP figures and provenance manifest copied unchanged. Calibration display is capped at 1177 px, centered, without inversion/cropping. Both figures link full-size originals.
- Included the authorized five editorial tweaks: Instagram destination CTA; later/nonautomatic research placement; Korean flight-electronics labels; coding-notebook home heading; December 6 “Together with the rocket.”
- Selected activity display weight is now actual 600. Research filter control borders use the existing secondary neutral token. Anchor offsets now match the relative/nonsticky header, with reduced-motion behavior retained.

## Source-to-claim map

Read the Task 2 brief, updated spec, all three required reference/source notes and asset README/manifest before implementation. No fresh media acquisition.

- Avionics `7cfb5be044e539c2e3c6d79a6538416a2741cd67`: `flight-computer/src/m7/main_m7.cpp` supports M7 sensing/health/UKF/state decisions and configured cadence; `src/shared/ipc_protocol.h` supports the framed inter-core edge; `src/m4/main_m4.cpp` supports logging/radio responsibilities and finite-buffer boundaries. Those sources are linked below the diagram.
- Same revision's `flight-computer/README.md` and `src/shared/telemetry_frame.h` support sensor/estimate/health distinctions. GNSS is explicitly not an input to the vertical UKF or flight-state decisions. Rates are configured, not measured guarantees; current software is not claimed flown on historical missions.
- Same revision's `ground-station/README.md` and `Groundstation.py` support integrated plots, position history, compatible-log playback, selectable speeds and freshness semantics. Received maximum and predicted apogee are not independently surveyed flight results.
- TMS `abb02a09bca4e7835425dc67b2c28234ef887992`: `TMS Unit/tms_code.ino` supports nominal 320 pairs/s versus ADS1115 860 SPS and latest/interleaved readings; `Calibration/calibration.py` supports fitting; `Calibration/tms_data_pipeline.py` and README support unit conversion, constant baseline, offline zero-phase filtering and summary windows. The kg calibration axis, reconstructed time and already-converted `raw_force_N` distinction are explicit.
- `https://postech-psi.github.io/test-results/` and its four HTML records provide dated values; corresponding GitHub Markdown records retain experiment notes missing from the HTML presentation. July figure is a 0–7 s excerpt, not the whole log or independently measured ignition delay. Calibration folder naming is not claimed as a verified date or universally applicable fit.

## RED → GREEN evidence

All commands below ran in `C:/Users/tae06/CODE/psi-website/.worktrees/launch-site/docs/launch-site` using PowerShell. In each command, `node` means the exact executable `C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`, invoked as `& '<executable>' <arguments>` against the existing port 8766 preview.

1. Before route implementation: `node check-engineering.cjs` exited 1. New Avionics/TMS route checks returned actual 404 versus expected 200 in both locales; overview links were absent; selected computed display weight was `'650' !== '600'`. These are meaningful missing-feature and existing-style REDs.
2. First integration exposed a checker issue: lazy images outside the viewport stalled `decode()`. The checker now scrolls each image into view before waiting for decoding. No production loading behavior was changed for the test. A language-agnostic 2500-character no-JS threshold rejected the complete 2309-character Korean TMS copy; coverage now asserts all four static chapters plus >2000 characters rather than padding content to satisfy an English-sized threshold.
3. Added responsive hidden-break regression before fixing the parent-reproduced joined words. `node check-engineering.cjs` exited 1 with both locales: `Hidden responsive heading break retains word separation`. Explicit whitespace adjacent to breaks made the same command green.
4. Added source-size regression before the calibration cap. Same command exited 1 for both locales: `Source figure is not upscaled`. Intrinsic-width cap then passed.
5. Added actual anchor-position coverage before removing obsolete offsets. Same command exited 1 for both locales: `Anchor target starts near the viewport top without obsolete fixed-header space`. Global 24 px padding and current-research 16 px margin then passed: case/gallery clicks and research target start within 42 px; reduced-motion scroll behavior remains `auto`.
6. Parent supplied fresh contrast RED for 12 control combinations (1.31:1 light / 1.53:1 dark). After border change, `node review/control-contrast.cjs` exited 0: 12 checks, `failures: []`, ratios 7.104391 light and 9.443911 dark. Root-owned checker was not modified.

Final focused outputs, all exit 0:

```text
node build.mjs
Built 22 PSI pages in docs/launch-site.

node check-engineering.cjs
PASS: en/ activity selection uses the supplied 600 display weight
PASS: en/ Avionics chapters and source boundaries
PASS: en/ TMS processing, real figures and dated results
PASS: en/ overview links, canonical player and selected display weight
PASS: en/ anchors account for the nonsticky header
PASS: en/ new chapters fit both themes at four widths
PASS: en/ static engineering content
PASS: ko/ activity selection uses the supplied 600 display weight
PASS: ko/ Avionics chapters and source boundaries
PASS: ko/ TMS processing, real figures and dated results
PASS: ko/ overview links, canonical player and selected display weight
PASS: ko/ anchors account for the nonsticky header
PASS: ko/ new chapters fit both themes at four widths
PASS: ko/ static engineering content

node check-current-content.cjs
24 PASS groups: five current studies, pinned responsibilities, initial viewport,
both themes at 320/390/768/1440 and no-JavaScript research details.

node check-motion-gallery.cjs replay
PASS: en/ replay
PASS: ko/ replay

node check-brand.cjs
10 PASS groups: display face/weight, neutral palette, native icon preference,
responsive header, breakpoint inert release, persistence/system/native keyboard.

node review/links.mjs
{ "pages": 22, "checkedLocalLinks": 564, "failures": [] }

node review/replay-data-audit.cjs
{ "samples": 343, "exactSourceValues": 1372,
  "peakReceivedEstimateMeters": 186.632, "finalState": "DEPLOY",
  "finalAltitudeMeters": 45.841, "privacyFields": "whitelist passed" }

node check.cjs
PASS: 22 bilingual routes; 4 widths; theme persistence; language parity;
archive filters/reset/empty state; mobile menu/Escape; intentional media switch;
actual pad/onboard playback; hardware tabs; font/image loading; browser errors.
```

The full suite ran once after implementation/figure/heading fixes. The final anchor-offset adjustment was covered afterwards by the complete focused engineering suite, including all new-page viewport/theme combinations. Full-suite media accessibility output also confirmed caption contrast 6.67/8.68, links 16.13/15.80, and keyboard focus VIDEO/pause true for both films and locales. `git diff --check` exited 0 (only repository CRLF conversion notices).

## Visual inspection and self-review

Captured 12 complete pages in `task-2-screenshots/`: Projects/Avionics/TMS × EN light/KO dark × 320/1440, isolated headless Edge, fonts/images decoded. Inspected the complete EN desktop Avionics and KO narrow TMS renders: chapter rhythm is consistent, responsibility stages remain explicit, results retain units/notes, graphs are uncropped and captions/source links remain separate from images. Parent separately inspected viewport chapter captures and drove the whitespace, intrinsic-size and anchor refinements. These are verification records, not final user visual acceptance.

The frontend-design skill guided the editorial chapter/diagram treatment instead of another card grid or fabricated dashboard; TDD drove the new contracts and review regressions; verification-before-completion required fresh test evidence. Existing application media behavior, current/historical research and gallery controls are preserved. Native white plots contain dense original labels on narrow screens, so visible full-size links remain the honest reading path. No claim upgrades, invented launch synchronization, fake live state or source-file leakage.

Changed implementation: `engineering-pages.mjs`, `content.mjs`, `templates.mjs`, `site.css`, `gallery-data.mjs`; tests `check-engineering.cjs`, `check-current-content.cjs`, `check-motion-gallery.cjs`, `check.cjs`; README; approved three TMS runtime assets; generated HTML deltas including four new pages. `build.mjs` needed no change because it already iterates the exported route list. Root review scripts, private acquisition tools, source assets and plans remain unstaged. No known functional blocker; independent review/final acceptance remains with parent.
