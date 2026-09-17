# PSI minimal editorial iteration — 2026-09-17

Local worktree review only. No merge, push, hosting change or publication.

## Requested changes delivered

- English leadership: Vice President Yeonho Kim, Secretary Taeho Lee, Avionics & TMS Lead Jaeyoung Park. The former NURA-lead row is removed. Both engineering case studies identify Jaeyoung Park. These updates come from the user; English spellings are editorial romanizations.
- One Pretendard variable family for the entire interface. Verified the actual [test-results stylesheet](https://postech-psi.github.io/test-results/assets/site.css?v=2026-06-16-clean-archive-logo): its sans, display and mono roles all resolve to Pretendard. The previous Barlow preload/font-face is removed.
- Unchanged official logo and neutral palettes; enlarged wordmark, quieter underlined film tabs, labelled 44px pause/sound icons instead of text boxes, and a direct sun/moon palette toggle.
- The preferred authentic rocket close-up is a larger uncropped photograph. A small desktop scroll movement and short activity transition provide optional motion. The film, photo and scientific evidence are not replaced by generated imagery or invented live data.
- Korean heading-final periods removed without altering body punctuation or decimal values. Spring MT removed from the displayed archive; five events and thirteen distinct photographs remain. Original archive files are preserved.

## Iteration evidence

1. Wrote failing functional tests for direct palette toggling, shared typography, larger logo, compact film controls and real photo movement. Implemented and reran to green.
2. An existing in-app preview visibly mixed new HTML with cached old CSS/JS: the theme button stayed hidden, the logo computed to96px and the new control rule was absent. Added content-fingerprinted assets, with a failing then passing build check; a normal reload now displays the new controls.
3. Visual review caught pause/sound controls at different heights when a real scrollbar consumed viewport width. A stable-scrollbar test failed; grouping controls inside the same film positioning context passed.
4. Added stable accessible toggle naming and a stronger translucent icon backing. Tests verify state semantics and at least3:1 white-icon contrast even over a white frame.
5. The full keyboard suite caught a resize race: at1440px the media query was already desktop but the tab's ARIA orientation was still horizontal. Keydown now resolves the current media query synchronously. The original test passed three consecutive repeats, then the full suite.
6. Revisited [Stoke Space](https://www.stokespace.com/) and [ETH Robotics](https://www.ethrobotics.ch/) visually. Applied stronger photographic/wordmark hierarchy and calmer controls without reusing their artwork or layouts. Tightened the English hero measure so its heading stays clear of the rocket.

## Verification

- Full check.cjs: passed all22 bilingual routes,320/390/768/1440 layouts, theme and language behavior, research filters, actual video playback, gallery interaction, recorded replay, fonts/images and browser-error checks.
- check-polish.cjs: passed in both languages, including320/390/901/1440 headers, true click/Space palette changes, persistent preference, visible-scrollbar alignment, and reduced-motion photo behavior.
- Asset fingerprints and renderer equivalence: passed;562 local links/anchors checked across22 pages.
- Broader rendered audit:1,858 checks,0 failures; latest report written at2026-09-17T02:43:51Z.
- Forty focused screenshots generated in both languages and palettes at390/1440. Representative hero, rocket scene, leadership and engineering views were visually inspected; no capture overflow. All Korean routes have0 heading-final periods.
- Gallery/media interaction audit: passed, including image failure/recovery, modal focus, Escape, single-photo navigation and remembered film pause.
- Replay audit:343 samples,1,372 exact source values, seven real gaps; keyboard scrubbing, static fallback and fetch-failure behavior preserved.
- Public-text privacy scan:33 files,0 findings. This is a scoped string/data audit, not a comprehensive security certification.
- Independent read-only reviewer: no blocking product issues. The minor mixed-preview-port finding was fixed by aligning test defaults at8767. The reviewer separately accepted the keyboard-resize fix.
- In-app browser: latest CSS/JS visibly loaded, direct light/dark icon clicks verified, Korean homepage left open.

## Guideline review of changed interface

Reviewed against the current [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines).

- site.js:16 — stable accessible toggle name, real button activation and persistent resolved state verified.
- site.js:80 — responsive keyboard direction uses current layout; other tab groups retain their existing semantics.
- site.css:270 — compact icon targets, explicit transitions, focus styles and theme-aware contrast verified.
- templates.mjs:20 — decorative SVGs hidden from assistive technology; meaningful film retains its description and native playback fallback.

Sentence-case editorial copy and documentary ISO dates are intentional. This is a focused review of the changed UI, not a claim of complete WCAG certification or final production acceptance. Existing layered CSS and machine-specific test runtime paths remain maintenance debt.
