const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PSI_URL || 'http://127.0.0.1:8766';

async function checkAccessibility(page) {
  const failures = [];
  const evidence = [];
  for (const locale of ['', 'ko/']) {
    await page.goto(`${base}/${locale}index.html`);
    for (const theme of ['light', 'dark']) {
      await page.locator('[data-theme-select]').selectOption(theme);
      const ratios = await page.locator('.testing-feature .test-plot figcaption').evaluate(caption => {
        const parse = value => (value.match(/[\d.]+/g) || []).map(Number);
        const luminance = rgb => rgb.slice(0, 3).map(channel => {
          const c = channel / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
        const ratio = node => {
          let ancestor = node;
          let background;
          while (ancestor) {
            const rgb = parse(getComputedStyle(ancestor).backgroundColor);
            if (rgb.length === 3 || rgb[3] === 1) { background = rgb; break; }
            ancestor = ancestor.parentElement;
          }
          const a = luminance(parse(getComputedStyle(node).color));
          const b = luminance(background || [255, 255, 255]);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        };
        return { caption: ratio(caption), links: [...caption.querySelectorAll('a')].map(ratio) };
      });
      const minimumLink = Math.min(...ratios.links);
      evidence.push(`${locale || 'en/'} ${theme}: caption ${ratios.caption.toFixed(2)}:1, links ${minimumLink.toFixed(2)}:1`);
      if (ratios.caption < 4.5) failures.push(`${locale || 'en/'} ${theme}: test caption contrast ${ratios.caption.toFixed(2)}:1 is below 4.5:1`);
      if (minimumLink < 4.5) failures.push(`${locale || 'en/'} ${theme}: test graph link contrast ${minimumLink.toFixed(2)}:1 is below 4.5:1`);
    }
    await page.goto(`${base}/${locale}pslv.html`);
    for (const view of ['pad', 'onboard']) {
      if (view === 'onboard') await page.locator('[data-media="onboard"]').click();
      await page.locator('[data-media-play]').focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('[data-flight-video]').currentTime > 0.2);
      const active = await page.evaluate(() => document.activeElement.tagName);
      if (active !== 'VIDEO') failures.push(`${locale || 'en/'} ${view}: keyboard play lost focus to ${active}`);
      await page.keyboard.press('Space');
      const paused = await page.locator('[data-flight-video]').evaluate(video => video.paused);
      if (!paused) failures.push(`${locale || 'en/'} ${view}: keyboard Space did not pause playback`);
      evidence.push(`${locale || 'en/'} ${view}: focus ${active}, keyboard pause ${paused}`);
      await page.locator('[data-flight-video]').evaluate(video => video.pause());
    }
  }
  console.log(evidence.join('\n'));
  assert.deepEqual(failures, [], 'Accessibility regression checks');
  console.log('PASS: plot caption/link contrast and keyboard video focus/pause in both languages.');
}

if (require.main === module) {
  (async () => {
    const browser = await chromium.launch({channel:'msedge',headless:true});
    try { await checkAccessibility(await browser.newPage()); }
    finally { await browser.close(); }
  })().catch(error => { console.error(error); process.exitCode = 1; });
}
module.exports = { checkAccessibility };
