# PSI — logo-led brand and engineering case studies

Base: `17f4555973e7bbc920fe7a7698d4df9fbc299428`. This pass responds to the user's subsequent requests: materially more polish, match the actual club logo, use icons for theme selection, substantially deepen Avionics/TMS descriptions, use the actual published test-results website, and apply the supplied Awesome Web Design resource collection.

The user explicitly requests autonomous implement–verify–evaluate–improve iterations. The direction below was explained in chat; do not insert another plan-only approval pause. No publication, push, merge or replacement of the production checkout is authorized.

## Brand system

The official banner and circular mark are black and white. Keep their artwork unchanged. Use documentary photo/plot colours, but remove the unsupported navy/blue UI palette.

Light: canvas `#FFFFFF`, surface `#F4F4F4`, text/action `#111111`, secondary `#525252`, border `#D7D7D7`, wash `#EDEDED`.

Dark: canvas `#000000`, surface `#121212`, text/action `#F5F5F5`, secondary `#B8B8B8`, border `#353535`, wash `#1B1B1B`.

Use a black header with the unchanged white-on-black wordmark in both themes, and white header controls. Increase the banner to approximately 152px desktop and 96px mobile while preserving aspect ratio. Header controls share a 44px interaction baseline. Test intermediate navigation breakpoints, not only desktop/mobile endpoints.

Keep Pretendard body/Korean text. Set a deliberate scale, approximately body 18px, metadata 14px, h3 28/24px, h2 44–48/32–36px, entry title 68–72/40–44px. Retain readable research manuscript titles. Compare Red Hat Display and officially licensed Barlow Semi Condensed 600 using actual headings before deciding a display-family change. Do not condense Korean text artificially. Avoid decorative monospace, repeated giant headings and new accent colours.

Actual-heading specimen decision: use Barlow Semi Condensed 600 for Latin display, Pretendard unchanged for Korean/body. Root inspected rendered comparisons at 320, 390 and 1440px (`review/type-specimen-*.png`); Barlow gives long engineering headings and the launch phrase a compact, stronger rhythm beside the official banner without shrinking body copy. Use natural font width and approximately -.01em display tracking, not horizontal scaling or synthetic 650 weight. Official TTF and exact OFL are prepared in `review/`; bundle both and remove the unused Red Hat display dependency.

Spacing follows an 8px rhythm: 16–24px within groups, 40–48px between related groups, approximately 80px mobile/112px desktop chapters. Keep evidence and its limitation/source together. Preserve the cinematic field opening; no parallax, scroll hijacking, animated counters or paragraph-by-paragraph reveals.

## Theme control

The closed control shows a sun, moon or monitor icon, not the current text dropdown. Retain the accessible native select and existing `[data-theme-select]` contract beneath a 44px visual wrapper; use a transparent positioned select, not `display:none`. Render decorative code-native SVG icons, localized accessible naming and a visible wrapper focus ring. Monitor means the selected System preference, even if the resolved palette is dark. `psi-theme`, OS changes, initial theme resolution and meta theme-color remain consistent. Native options remain legible in forced colours and Windows dark mode.

## Engineering content structure

Add bilingual `avionics.html` and `tms.html` case studies: 22 routes total. Preserve Projects as a navigable overview, including existing `#avionics` and `#tms` anchors. Each overview contains a meaningful concise summary and links to its case study, not two complete duplicated long pages. New case studies keep Projects current in main navigation and retain route-preserving locale switching.

Avionics chapters: engineering problem → source-backed M7/M4 architecture → sensor/vertical-state estimation → decisions/recording/telemetry → integrated ground station → received-record replay/limits → pinned implementation sources. Include a responsive semantic architecture diagram of actual data responsibilities, explicitly an explanatory software diagram, not a PCB schematic or verified flown configuration. Preserve GNSS separation from the vertical UKF. Rates describe configured code, not measured end-to-end performance. Move the existing player to the Avionics evidence chapter; retain a Projects preview/link, not a second full player.

TMS chapters: instrument channels → acquisition/storage → calibration → offline analysis → dated results and limitations → actual portal/source. Use code-level source notes where README statements lag the scripts. Distinguish nominal 320-sample cadence from 860 SPS ADC conversion, reconstructed time from independent timing measurements, offline zero-phase filtering from real-time processing, and constant baseline subtraction from time-varying drift compensation.

Primary visitor-facing results destination: `https://postech-psi.github.io/test-results/`; comparison deep link `#comparison`. All four dated result links must target verified HTML detail pages. Keep GitHub/raw Markdown as distinctly labelled subordinate provenance, especially where original notes contain caveats absent from the rendered portal. July 16 is the latest listed test, not the existing April 8 plot. Do not highlight July pressure metrics without the documented anomaly. Prefer the real portal over a duplicated or invented dashboard. No iframe is required: there is no documented resize/theme/language embed contract.

Approved additional figures: `review/tms-asset-candidates/tms-july16-thrust.webp` and `tms-loadcell-calibration.webp`. Both source originals and prepared derivatives were visually inspected; use their README captions/limits and manifest provenance. Copy the two optimized derivatives plus manifest into runtime assets during Task2. Preserve full frame, original colours and visible full-size links. Calibration y-axis is kg, not N, and its folder is not a verified experiment date. July figure shows corrected force, not raw ADC, with the pressure anomaly note nearby; the portal is the destination for full comparison. Existing April8 figure can remain as an honestly dated separate example.

Required sources: `docs/launch-site/review/tms-portal-source.md`, `engineering-depth-source.md`, and `brand-reference-notes.md`. Read the engineering source note before writing the deeper copy. All previously established manuscript, telemetry, photo/date and privacy boundaries remain.

## Verification and acceptance

Preserve five current studies, fifteen historical records, six events/fourteen photos, real film controls and 343-sample/seven-gap replay. No private manuscript files, signed links or coordinates enter public assets. No-JavaScript and fetch/image/media fallbacks remain useful.

Verify native icon preference keyboard/focus/storage/system behaviour, neutral contrast tokens, unchanged logo artwork, real portal links, four dated results/caveats, complete bilingual case-study chapters, source-backed architecture paths, all 22 routes, and updated old anchors/tests/README. Inspect actual desktop/mobile views in both languages/themes. Keep one app writer; independent source/code reviewers and root visual QA evaluate the committed delta. Root-owned audit scripts may be migrated only by root unless specifically delegated.
