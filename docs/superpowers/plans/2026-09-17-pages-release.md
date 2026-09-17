# PSI Pages Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to execute these tasks inline, with review checkpoints.

**Goal:** Publish the approved bilingual redesign at the existing GitHub Pages URL after local verification.

**Architecture:** Keep the existing main/root branch-based Jekyll deployment and legacy Shop. Export only the new site's generated public routes, runtime scripts, referenced media and required license into the repository root. Exclude conflicting old Markdown routes from Jekyll, retaining their source and providing Team/Events/Contact redirects.

**Tech Stack:** Node standard library, existing static HTML/CSS/JS, Jekyll/GitHub Pages, existing Git credentials.

**Spec:** User's latest explicit request to push and deploy after completing the redesign; current design in docs/superpowers/design-decisions.md.

## Global Constraints

- Remote: https://github.com/postech-psi/psi-website.git; existing live URL: https://postech-psi.github.io/psi-website/.
- Confirmed remote/main and fork base:076d52832c77c4c7d8747a3ee7625a6b677767b1.
- Preserve the original checkout's clean state, legacy Shop, all original source files and the current worktree.
- No force push, credential extraction, access-policy changes, raw cloud documents or private media URLs.
- Only the user-facing subset is exported; tests, review files, source manifests and removed spring media are excluded from the live artifact.

### Task1: Deterministic public exporter and tests

**Files:** tools/export-launch-site.mjs; tools/check-release.mjs.

**Interfaces:** exportSite(destination:string) => Promise<{generator:string,revision:string,files:Array<{path:string,sha256:string,bytes:number}>}>.

- [x] Write a test using a fresh temporary directory. Assert22 bilingual routes, all referenced assets, actual onboard media, font license, and redirects. Assert no docs/review/manifests/PPT/PDF/spring-event export. Verify SHA256 for every output.
- [x] Run node tools/check-release.mjs and observe the missing-exporter failure.
- [x] Implement the exporter: derive local asset names from rendered HTML/CSS/runtime references; add required dynamic onboard media and font license; reject unsafe paths or overwriting unowned/modified existing output; never delete files. Write release.json with deterministic hashes.
- [x] Verify repeat export is identical and foreign/modified outputs are rejected. Export into fresh temporary test directories and a git-ignored psi-website subdirectory for actual prefix-path testing.

### Task2: Existing Pages integration

**Files:** _config.yml; README.md; generated root/ko HTML, root runtime files, selected assets, release.json.

- [x] Add index.md, about.md, projects.md, team.md, events.md and contact.md to Jekyll excludes. Preserve shop.md and its existing assets.
- [x] Generate root output with node tools/export-launch-site.mjs. Keep source under docs/launch-site as the single editable template/content source. Enforce LF for reproducible cross-platform hashes.
- [x] Run the complete browser suite using PSI_URL=http://127.0.0.1:8767/psi-website against the exported prefix-path staging directory. Reuse the working preview server; a separate background-server launch was unavailable. Result:22 bilingual routes,4 widths, actual media playback and all interaction checks passed.
- [x] Run public-text/privacy, generated-file hashes, route/asset checks and a read-only release review. Result:33 public text files with no flagged private content,562 local links with no failures,69 staged Git blobs match the manifest, and independent review found no actionable blockers. The upstream font license is copied byte-for-byte, including its existing line32 trailing space.
- [x] Document build/export/rollback steps; prepare the local release commit. Ruby/Jekyll is not installed locally; the existing Pages workflow and production bytes are the final Jekyll integration gate.

### Task3: Push, deploy and observe

- [ ] Fetch remote/main again; confirm no unexpected remote changes. Integrate with main using a non-destructive fast-forward and push without force.
- [ ] Find the Pages workflow run whose head_sha equals the pushed commit. Wait for its conclusion without tight polling.
- [ ] Fetch production release.json and all22 routes. Verify revision, successful status, theme button, new leadership, font/styles and actual media requests.
- [ ] Open the deployed Korean homepage for the user. Record workflow URL and pushed commit.

**Rollback:** If the deployment or essential homepage/theme/media/route smoke checks fail, investigate first. The pre-release known-good main is076d52832c77c4c7d8747a3ee7625a6b677767b1. A normal revert of the release integration is the recoverable rollback; never reset or force-push history.

No database, feature flags, on-call service or production telemetry dashboard exists for this static site. Verification uses the Pages run and repeated public HTTP/browser smoke checks rather than inventing unavailable metrics.

Pre-push repeat testing found a test timing race after native dialog Escape. A20-cycle diagnostic confirmed that `open` clears before the queued close event, and every cycle restored scrolling;19 immediate observations preceded the close event. The gallery check now waits for the actual closed/unlocked state with a1-second failure bound before asserting focus and scroll recovery. No runtime behavior or release asset changed.
