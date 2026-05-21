# PSI Website Iteration Log

This log documents the required 12 review/fix phases for the full-site redesign.

1. Baseline audit: confirmed the repo is a compact Jekyll site with Home, About, Projects, Team, Events, Contact, visible mojibake, thin content, logo-only media, and a decorative starfield theme.
2. Content integrity pass: rewrote visible copy, README, navigation labels, page metadata, and footer content with clean UTF-8 Korean/English text.
3. Information architecture pass: recentered the site around public visitors: mission, programs, milestones, team structure, joining, and contact paths.
4. Visual hierarchy pass: replaced the oversized generic hero and card styling with a publication-style hero, metric band, denser project records, and more disciplined section rhythm.
5. Media pass: generated and installed temporary hero, avionics, and propulsion-test visuals under `assets/images/generated/` with replacement guidance.
6. Research credibility pass: expanded Avionics, TMS, and PSLV-I into public program records with status, focus, platform, repositories, and technical tags.
7. Interaction pass: implemented persistent KO/EN language switching, persistent light/dark theme switching, active navigation states, and mobile menu behavior.
8. Accessibility pass: added skip link, semantic regions, button labels, focus outlines, keyboard escape handling, alt text, and reduced-motion handling.
9. Responsive pass: added breakpoints for tablet/mobile grids, compact hero sizing, mobile menu layout, image cropping, timeline stacking, and narrow viewport spacing.
10. Static fallback pass: default HTML renders Korean content without JavaScript, with English available as enhancement and page content readable before hydration.
11. Audit harness pass: added `tools/audit-site.js` for encoding symptoms, bilingual markers, metadata, internal references, asset existence, and required page checks.
12. Publication polish pass: tightened copy to sound public-facing and student-research appropriate, removed internal archive language, and documented generated asset usage in README.

Regression loop: after implementation, rerun `node tools/audit-site.js`, `bundle exec jekyll build`, and browser smoke checks; fix any new findings before publishing.

## Unworldly Design Loop

1. Baseline visual critique: identified the first redesign as clean but still close to a conventional aerospace landing page.
2. Reference extraction: retained the useful patterns from major aerospace references: strong first viewport, technical confidence, mission records, and media-led storytelling.
3. Art direction pass: shifted the site toward a darker mission-control atmosphere with telemetry texture, orbital geometry, and precise dossier components.
4. Hero pass: replaced the hero with a stronger launch-range visual, mission kicker, telemetry console, and orbital arc.
5. Systems storytelling pass: converted generic capability cards into connected subsystem nodes.
6. Project dossier pass: upgraded project records with objective, vehicle role, constraint, and next milestone panels.
7. Media pass: added stronger generated visuals for launch range, avionics bay macro, and ground-station workshop.
8. Motion pass: added restrained reveal-on-scroll behavior with reduced-motion fallback.
9. Bilingual polish pass: refreshed core Korean and English copy on the homepage, mission page, projects page, config, and footer.
10. Accessibility pass: preserved skip link, focus states, semantic content, alt text, keyboard menu close, and reduced-motion support.
11. Responsive drama pass: tuned mission console, subsystem nodes, dossier grids, media frames, and mobile stacking.
12. Performance pass: kept the site static, avoided continuous animation, and used lazy loading for non-hero generated media.
13. Audit pass: expanded required generated asset checks and image alt checks in `tools/audit-site.js`.
14. Ruthless taste pass: removed generic “what we do” framing in favor of mission architecture, evidence culture, and technical records.
15. Regression loop: rerun audit/build/browser checks after every major visual change.
