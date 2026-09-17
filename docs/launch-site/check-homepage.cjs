const {setTheme} = require('./test-helpers.cjs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PSI_URL || 'http://127.0.0.1:8767';

async function checkHomepage(browser) {
  const failures = [];
  const check = async (name, run) => {
    try { await run(); console.log(`PASS: ${name}`); }
    catch (error) { failures.push(`${name}: ${error.message}`); }
  };
  for (const locale of ['', 'ko/']) {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    const page = await context.newPage();
    await page.goto(`${base}/${locale}index.html`);
    await check(`${locale || 'en/'} activity selection changes the actual media, copy and destination`, async () => {
      assert.equal(await page.locator('[data-activity]').count(),3,'Three activity controls must exist');
      for (const [id, file, destination] of [['projects','field-team.webp','projects.html'],['research','tms-test-2026-04-08-preview.webp','research.html'],['learning','team.webp','learning.html']]) {
        const tab = page.locator(`[data-activity="${id}"]`);
        await tab.click();
        assert.equal(await tab.getAttribute('aria-selected'),'true');
        const panel = page.locator('[data-activity-panel]:visible');
        assert.equal(await panel.count(),1);
        assert.equal(await panel.getAttribute('id'),await tab.getAttribute('aria-controls'));
        assert.equal(await panel.getAttribute('aria-labelledby'),await tab.getAttribute('id'));
        assert.ok((await panel.locator('img').getAttribute('src')).endsWith(file));
        await panel.locator('img').evaluate(img => img.decode());
        assert.ok(await panel.locator('img').evaluate(img => img.naturalWidth > 0),'Selected image must load');
        assert.ok((await panel.locator('[data-activity-destination]').getAttribute('href')).endsWith(destination));
        assert.ok((await panel.locator('p').textContent()).length > 50,'Selected activity includes explanatory copy');
        if (id === 'research') assert.ok(await panel.locator('a[href$="tms-test-2026-04-08.png"]').count() > 0,'Displayed graph retains its full-size source');
      }
      await page.locator('[data-activity="projects"]').focus();
      for (const [key,id] of [['ArrowDown','research'],['End','learning'],['ArrowRight','projects'],['ArrowUp','learning'],['Home','projects'],['ArrowLeft','learning']]) {
        await page.keyboard.press(key);
        assert.equal(await page.locator('[data-activity]:focus').getAttribute('data-activity'),id,`Focus after ${key}`);
        assert.equal(await page.locator('[data-activity][aria-selected="true"]').getAttribute('data-activity'),id);
      }
      assert.equal(await page.locator('[data-activity][tabindex="0"]').count(),1);
    });
    await check(`${locale || 'en/'} horizontal activity tabs preserve vertical keyboard scrolling after resize`, async () => {
      await page.setViewportSize({width:390,height:844});
      await page.locator('[data-activity="projects"]').click();
      const beforeDown = await page.evaluate(() => scrollY);
      await page.keyboard.press('ArrowDown');
      assert.equal(await page.locator('[data-activity][aria-selected="true"]').getAttribute('data-activity'),'projects','Horizontal tabs must not select with ArrowDown');
      assert.equal(await page.locator('[data-activity]:focus').getAttribute('data-activity'),'projects');
      await page.waitForFunction(before => scrollY > before, beforeDown);
      await page.keyboard.press('ArrowUp');
      assert.equal(await page.locator('[data-activity][aria-selected="true"]').getAttribute('data-activity'),'projects','Horizontal tabs must not select with ArrowUp');
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-activity]:focus').getAttribute('data-activity'),'research');
      await page.setViewportSize({width:1440,height:1000});
      await page.keyboard.press('ArrowDown');
      assert.equal(await page.locator('[data-activity-tabs]').getAttribute('aria-orientation'),'vertical','Keyboard uses current layout even before a delayed media-query event');
      assert.equal(await page.locator('[data-activity]:focus').getAttribute('data-activity'),'learning','Vertical arrow handling returns after widening');
    });
    await check(`${locale || 'en/'} hero exposes one playback interface and preserves keyboard focus`, async () => {
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.setViewportSize({width:1440,height:1000});
      await page.goto(`${base}/${locale}index.html`);
      const video = page.locator('[data-flight-video]');
      const play = page.locator('[data-media-play]');
      assert.equal(await video.evaluate(v => v.controls),false,'Native controls wait until intentional playback');
      assert.ok(await play.isVisible());
      await play.focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('[data-flight-video]').currentTime > .2);
      assert.equal(await video.evaluate(v => v.controls),true);
      assert.equal(await page.evaluate(() => document.activeElement.tagName),'VIDEO');
      await video.evaluate(v => v.pause());
      assert.equal(await play.isVisible(),false,'Pausing must not cover native controls');
      await page.locator('[data-media="onboard"]').click();
      assert.equal(await video.evaluate(v => v.controls),false);
      assert.ok(await video.evaluate(v => v.paused));
      assert.ok((await video.getAttribute('poster')).endsWith('onboard-poster.webp'));
      assert.equal(await video.evaluate(v => getComputedStyle(v).objectFit),'contain','Onboard video retains its complete frame');
      assert.ok(await play.isVisible());
      assert.match(await page.locator('[data-media-description]').textContent(),/rapid|빠른/);
      await play.click();
      await page.waitForFunction(() => document.querySelector('[data-flight-video]').currentTime > .2);
      await video.evaluate(v => v.pause());
      assert.equal(await play.isVisible(),false);
      await page.locator('[data-media="pad"]').click();
      assert.ok((await video.getAttribute('poster')).endsWith('launch-poster.webp'));
      assert.ok(await video.evaluate(v => v.paused));
    });
    await check(`${locale || 'en/'} failed-video link has a visible keyboard outline in both themes`, async () => {
      await page.route('**/assets/onboard.mp4', route => route.abort());
      await page.goto(`${base}/${locale}index.html`);
      await page.locator('[data-media="onboard"]').click();
      const failure = page.locator('[data-media-failure]');
      await failure.waitFor({state:'visible'});
      for (const theme of ['light','dark']) {
        await setTheme(page,theme);
        await page.keyboard.press('Tab');
        const link = failure.locator('a');
        await link.focus();
        const contrast = await link.evaluate(node => {
          const luminance = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(value => {
            const c = value / 255;
            return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
          }).reduce((sum,c,i) => sum + c * [.2126,.7152,.0722][i],0);
          const style = getComputedStyle(node);
          const foreground = luminance(style.outlineColor);
          const background = luminance(getComputedStyle(node.closest('[data-media-failure]')).backgroundColor);
          return {visible:node.matches(':focus-visible') && style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,ratio:(Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05)};
        });
        assert.ok(contrast.visible,'Error link must show a keyboard focus indicator');
        assert.ok(contrast.ratio >= 3,`${theme} error-link outline contrast ${contrast.ratio.toFixed(2)}:1 must reach 3:1`);
      }
    });
    await context.close();
    const fallback = await browser.newContext({javaScriptEnabled:false});
    const plain = await fallback.newPage();
    await plain.goto(`${base}/${locale}index.html`);
    await check(`${locale || 'en/'} no-JavaScript activities and native playback remain available`, async () => {
      assert.equal(await plain.locator('[data-activity-panel]:visible').count(),3);
      assert.ok(await plain.locator('[data-flight-video]').evaluate(v => v.controls));
      assert.equal(await plain.locator('[data-media-play]').isVisible(),false);
    });
    await fallback.close();
  }
  assert.deepEqual(failures, [], 'Homepage behavior checks');
}
if (require.main === module) (async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try { await checkHomepage(browser); } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
module.exports = {checkHomepage};
