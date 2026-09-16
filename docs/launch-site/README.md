# PSI local launch-site review

This is a standalone bilingual static review site. It lives under the Jekyll-excluded `docs` directory; no production route, deployment or external publication is changed.

## Build and preview

Run from this directory with Node.js:

```sh
node build.mjs
python -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/`. English is the entry language. The eleven pages have matching paths under `ko/`; the language switch retains the current page.

The build uses only Node's standard library. Content records are in `content.mjs`, current manuscripts in `current-research.mjs`, event records in `gallery-data.mjs`, HTML structure and bilingual page copy in `templates.mjs` and the engineering chapters in `engineering-pages.mjs`, presentation in `site.css`, and browser behaviour in `site.js`. `telemetry-view.mjs` renders the static recorded plot; `telemetry.mjs` enhances it with playback. Running the build writes all 22 HTML pages. Keep the generated HTML with the source for direct local review.

## Verification

The Projects overview retains its `#avionics` and `#tms` anchors and links to dedicated bilingual case studies. `avionics.html` explains the pinned M7/M4 implementation and owns the recorded player at `#flight-record`; Projects does not duplicate the player. `tms.html` explains acquisition, calibration and offline processing. Home and TMS lead to the actual public [test-results portal](https://postech-psi.github.io/test-results/), with dated HTML detail links and separate original experiment-note links. The July thrust and calibration figures retain their original white graph backgrounds, full-size source links and adjacent limitations; provenance is in `assets/tms-media-manifest.json`.

`node check.cjs` expects the local server at port 8766. It uses the bundled Playwright installation and a fresh headless Edge process. Set `PSI_URL` to use another loopback origin. The checker closes its browser in a `finally` block and returns a non-zero exit status on a failed assertion.

The checks cover all 22 pages at 320, 390, 768 and 1440 pixels; theme persistence; route-preserving language links; research topic/search filters, reset and empty state; mobile menu Escape/scroll restoration; selected hardware panels; media switching; actual pad/onboard playback; font and image loading; and browser exceptions. The full checker includes `check-homepage.cjs`, `check-current-content.cjs`, `check-motion-gallery.cjs`, `check-brand.cjs` and `check-engineering.cjs`. Run these individually for focused checks; the motion checker also accepts `theme`, `hero`, `handoff`, `gallery`, `loading`, `replay`, `preferences` or `fallbacks` as its final argument. It covers real playback, background-to-native-control focus, remembered pause, reduced motion, Save-Data, policy rejection, stale promises, gallery keyboard/mobile controls and recorded sample playback. Save-Data, policy rejection and document visibility are controlled environment fixtures; actual media time and UI state are asserted. Desktop/mobile screenshots are written locally and excluded from version control. Root review scripts add independent theme, anchor, source-data and privacy checks.

## Content and media

Public repositories, the PSI public research register and POSTECH's founder article ground the project, research and history copy. Five ongoing September 2026 manuscripts are separated from fifteen historical records; acceptance/publication status is unverified. Conference records retain their original Korean titles. English research descriptions and UGRP award glosses are editorial translations. Recruitment copy links to current announcements without claiming that applications are open.

Approved photographs and video derivatives are in `assets`. The original full-size TMS graph is linked from the proportionally reduced inline preview. The PSI logo is unchanged. Barlow Semi Condensed (Latin display) and Pretendard (Korean/body) are self-hosted with their respective license files. Raw iCloud downloads, internal decks, manuscript pages and precise-coordinate telemetry screenshots are not included.

Only the homepage pad film can begin as a muted inline background loop. It pauses offscreen, in a hidden document, or while navigation/dialog interaction obscures its control. A persistent pause/resume button preserves explicit user pause. Reduced-motion and Save-Data begin with a still poster; explicit playback remains available. “Watch with sound” hands playback to native controls. Onboard and PSLV-page films always require intentional play; the onboard warning describes rapid camera rotation. Switching viewpoints leaves the new clip paused. Native controls remain available without JavaScript. Homepage activity tabs switch real imagery, copy and destinations; without JavaScript, all three activities remain readable. Theme selection stores only `psi-theme` locally and follows the system setting when selected.

The gallery contains fourteen unique photographs from six documented events, with month/season labels where exact capture dates are unverified. Static photo links work without JavaScript; enhancement provides an accessible modal with keyboard navigation, full image proportions and focus return. Single-photo events remain single-photo events. Thumbnails are derivatives, not additional photographs. Some OneDrive images are 1024px archive previews and are not presented as camera originals.

The canonical recorded player at `avionics.html#flight-record` uses 343 selected received public-log samples with seven documented gaps, rendered as eight disconnected SVG traces. Time is relative to the excerpt start, not liftoff. Controls play, pause, reset and scrub actual samples; they never interpolate across gaps. Playback pauses when the document is hidden and stops at the last DEPLOY sample. The maximum received estimate is 186.632 m; it is not a vehicle specification or evidence of landing. The excerpt's date/vehicle and synchronization with the films are unconfirmed. `assets/archive-telemetry.json` contains only four sample fields, elapsed gap boundaries and a pinned public source link. Fetch/JavaScript failures preserve the static plot and summary. Private raw manuscripts, source files, absolute times and coordinates are not runtime inputs.

This checkpoint establishes complete content and working interactions. Visual refinement and independent design review remain the root task's responsibility; a passing test suite is not design approval.
