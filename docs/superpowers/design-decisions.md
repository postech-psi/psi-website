# PSI redesign: decisions visible in the page

Status: local review build; not published or merged into the live site.

## Design skills and their concrete effect

- **Frontend design:** the actual launch scene is the opening composition. The tall vehicle photograph and hardware close-up establish a layout specific to rockets. Following the user's logo-led request, the unsupported navy/blue UI was replaced by neutral white/light grey and black/charcoal themes. The official black-and-white wordmark is unchanged and more legible in a black header.
- **Typography, latest user direction:** the previous Red Hat/Barlow comparison is superseded. The live PSI test-results portal's stylesheet defines Pretendard for sans, display and mono roles. The site now uses that same self-hosted variable family for both languages, headings and controls. Font weight, line length and spacing establish hierarchy; no condensed display face is loaded.
- **Web interface guidelines:** keyboard-visible focus, correctly associated tabs, theme-aware contrast, real destinations, reduced-motion behavior and intentional video playback are checked alongside the layout. A passing screenshot is not sufficient evidence of functioning controls.
- **Brainstorming and planning:** the user-approved launch-site direction is the design constraint. Subsequent source material enriches the same design rather than restarting it or silently choosing a different direction.
- **Browser testing and verification:** the site is rendered in a fresh browser, with real video playback, language and theme changes, mobile navigation and research filters exercised. Desktop/mobile screenshots are inspected rather than treating generated HTML as a completed design.

## References translated, not copied

- EPFL Rocket Team: immediate, authentic field imagery.
- Stoke: hardware explanations tied to visible details.
- Varda: a selected state that changes meaningful media and content.
- ETH Robotics: actual people and community rather than stock imagery.
- [Awesome Web Design](https://github.com/nicolesaidy/awesome-web-design): used as a resource directory, not misrepresented as an installable skill. Typescale informed the responsive hierarchy; Typewolf informed wordmark/image emphasis; Material icon-button guidance informed the 44px sun/moon toggle; Apple motion guidance and Framer media guidance supported optional, interruptible motion.

No reference-site images, branding or code are reused. These influences do not establish quality by themselves; the rendered result remains the test.

## Content and source boundaries

The local review build contains twenty-two English/Korean routes, including dedicated Avionics and TMS case studies. Content includes five current manuscript studies, fifteen separately labelled historical research records and thirteen unique photos across five events. Pinned public GitHub avionics/TMS code anchors technical descriptions; manuscript work, configured software behavior, recorded results and validated demonstrations are not conflated. Original club photographs and launch/onboard films supply the imagery.

Avionics explains core responsibilities, measurements versus estimates, logging and the ground station, then offers a recorded 343-sample excerpt with visible gaps and source limitations. TMS follows acquisition through calibration and offline processing to four dated results. Two authentic source figures are shown full-frame; native calibration size is respected and original-size links remain available. The published results portal is the primary visitor destination, with implementation and original experiment notes retained as separate provenance links.

The supplied manuscript and ground-station recording inform the account without publishing their raw files, precise coordinates or internal logs. The manuscript's vehicle naming and the public timeline differ, so manuscript performance values are not assigned to a particular PSLV generation. Current recruitment dates are not invented.

## Operational decisions and tradeoffs

1. Keep the worktree ignore in local Git configuration, leaving the production ignore file unchanged. Another checkout may need the same local configuration.
2. Use bundled Node/Playwright rather than adding a package installation. Another machine needs an equivalent test runtime.
3. Record the already-approved chat direction in the written specification. Later source-backed copy may still need editorial review before publication.
4. Separate the initial CSS and behavior implementation into sequential checkpoints to obtain an earlier render. This required an extra CSS/JavaScript integration check.
5. Add a bounded homepage refinement after the user's renewed critique. It is reversible, but further art-direction changes may still be needed after user review.
6. Superseding the earlier select: one click on the sun/moon icon directly switches light/dark. Fresh state follows the OS, explicit choice persists, and legacy stored System remains supported. A stable Dark mode accessible name pairs with aria-pressed; the tooltip states the opposite-palette action. Keyboard and forced-colours focus remain checked.
7. Use the real published [test-results portal](https://postech-psi.github.io/test-results/) as the visitor-facing destination; GitHub remains provenance. The portal has no established embed/resize/theme contract, so a direct link is preferable to a fragile framed dashboard.
8. Keep motion purposeful: actual launch footage, chosen viewpoints, photo navigation and received-record replay. Respect explicit pause and reduced motion; no invented live flight data, animated performance counters or scroll hijacking.
9. Use the stronger existing neutral secondary token for research input boundaries. Decorative divider tokens remain subdued, while the controls now achieve measured 7.10:1 light /9.44:1 dark boundary contrast.
10. Match chapter anchor spacing to a nonsticky header. Responsive heading breaks retain real spaces, and native scientific figures are neither recolored for dark mode nor enlarged beyond their available detail.

## Minimal editorial iteration — 17 September 2026

- Revisited [ETH Robotics](https://www.ethrobotics.ch/) and [Stoke Space](https://www.stokespace.com/) in the browser. Applied quiet controls, stronger image/wordmark hierarchy and less competing UI, not their layouts or branding. The preferred PSI close-up already exists as an approved 1800×2400 derivative and is shown uncropped at up to680px wide.
- Removed hero text-box controls in favor of labelled44px icons and underlined viewpoint tabs. Both icons share one positioning context, avoiding viewport/scrollbar misalignment. A half-opacity black backing guarantees non-text contrast even over a bright film frame.
- Kept the neutral palette and enlarged the unchanged official logo to208px on desktop, with148/128/120px responsive sizes.
- One optional ±42px desktop photo movement and a320ms activity-panel transition supplement the real launch film. Content is always visible; reduced-motion and mobile photo layouts remain static.
- Updated current leadership from the user's corrections, in English, and named Jaeyoung Park in both engineering case studies. Removed the spring MT gallery event without deleting archive originals. Removed terminal Korean heading periods only.
- Returning-browser QA exposed stale unversioned CSS/JS. The renderer now fingerprints each runtime asset. Keyboard-resize QA exposed delayed media-query delivery; activity keys now query current layout synchronously.
- This design checkpoint was initially local-only. The subsequent explicit push/deploy request is handled by the Pages release plan below. The local preview is port8767; browser tests and review tools use the same default.

## Authorized Pages release — 17 September 2026

- Preserve the existing main/root Jekyll Pages workflow and legacy Shop, while exporting the approved bilingual site from docs/launch-site. Retain old source documents and add Team/Events/Contact redirects.
- Export only69 intended public files, with a deterministic release manifest. Exclude private/review materials, unused fonts and removed spring-event imagery from the website artifact. Do not delete original archives.
- Verify the exported artifact at the real `/psi-website/` prefix, then confirm the Pages workflow and production artifact hashes after a normal fast-forward push. No credential extraction, forced history changes or hosting-policy changes.
