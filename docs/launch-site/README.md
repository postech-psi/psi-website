# PSI local launch-site review

This is a standalone bilingual static review site. It lives under the Jekyll-excluded `docs` directory; no production route, deployment or external publication is changed.

## Build and preview

Run from this directory with Node.js:

```sh
node build.mjs
python -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/`. English is the entry language. The eight pages have matching paths under `ko/`; the language switch retains the current page.

The build uses only Node's standard library. Content records are in `content.mjs`, HTML structure and bilingual page copy in `templates.mjs`, presentation in `site.css`, and browser behaviour in `site.js`. Running the build writes all 16 HTML pages. Keep the generated HTML with the source for direct local review.

## Verification

`node check.cjs` expects the local server at port 8766. It uses the bundled Playwright installation and a fresh headless Edge process. Set `PSI_URL` to use another loopback origin. The checker closes its browser in a `finally` block and returns a non-zero exit status on a failed assertion.

The checks cover all 16 pages at 320, 390, 768 and 1440 pixels; theme persistence; route-preserving language links; research topic/search filters, reset and empty state; mobile menu Escape/scroll restoration; selected hardware panels; intentional media switching; actual pad/onboard playback; font and image loading; and browser exceptions. Desktop/mobile screenshots are written locally and excluded from version control. The root review scripts add independent all-theme/local-anchor checks.

## Content and media

Public repositories, the PSI public research register and POSTECH's founder article ground the project, research and history copy. Conference records retain their original Korean titles. English research descriptions and UGRP award glosses are editorial translations. April 2026 selections are labelled as topic selections, separate from confirmed results. Recruitment copy links to current announcements without claiming that applications are open.

Approved photographs and video derivatives are in `assets`. The original full-size TMS graph is linked from the proportionally reduced inline preview. The PSI logo is unchanged. Red Hat Display and Pretendard are self-hosted with their respective license files. Raw iCloud downloads, internal decks, manuscript pages and precise-coordinate telemetry screenshots are not included.

Videos never autoplay. Visitors select the launch-pad or onboard view and explicitly play it. The onboard view has a rapid-camera-rotation warning. Native controls provide pause, seek, volume and fullscreen, while the overlay provides play/resume/replay. Theme selection stores only `psi-theme` in local browser storage and follows the system setting when selected.

This checkpoint establishes complete content and working interactions. Visual refinement and independent design review remain the root task's responsibility; a passing test suite is not design approval.
