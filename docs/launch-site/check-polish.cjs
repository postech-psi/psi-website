const assert = require('node:assert/strict');
const {chromium} = require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PSI_URL || 'http://127.0.0.1:8767';

async function checkPolish(browser) {
  const failures = [];
  const check = async (name, fn) => {
    try { await fn(); console.log(`PASS: ${name}`); }
    catch (error) { failures.push(`${name}: ${error.message}`); }
  };
  for (const locale of ['', 'ko/']) {
    const context = await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light',reducedMotion:'reduce'});
    const page = await context.newPage();
    await check(`${locale || 'en/'} icon click and keyboard persist a real palette change`, async () => {
      await page.goto(`${base}/${locale}index.html`);
      const toggle = page.locator('button[data-theme-toggle]');
      assert.equal(await toggle.count(),1,'Theme is a directly operable button');
      const themeName=await toggle.getAttribute('aria-label');
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      await toggle.click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
      assert.equal(await toggle.getAttribute('aria-pressed'),'true');
      assert.equal(await toggle.getAttribute('aria-label'),themeName,'Pressed state uses a stable accessible name');
      assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'),'#000000');
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
      await toggle.focus(); await page.keyboard.press('Space');
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      await page.emulateMedia({colorScheme:'dark'});
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Explicit preference survives an OS change');
    });
    await check(`${locale || 'en/'} unified font, larger logo and compact film controls`, async () => {
      await page.goto(`${base}/${locale}index.html`); await page.evaluate(()=>document.fonts.ready);
      const faces = await page.locator('body,h1,h2,h3,button').evaluateAll(els=>els.map(el=>getComputedStyle(el).fontFamily));
      assert.ok(faces.every(face=>face.split(',')[0].replaceAll('"','').trim()==='Pretendard'),'Headings and controls share the reference-site face');
      await page.addStyleTag({content:'html{overflow-y:scroll;scrollbar-gutter:stable}'});
      for (const width of [320,390,901,1440]) {
        await page.setViewportSize({width,height:1000});
        const logo = await page.locator('.brand img').boundingBox();
        assert.ok(logo.width >= (width>1100?190:120),'Wordmark uses more of the header');
        for (const control of ['[data-media-play]','[data-motion-toggle]']) {
          const box = await page.locator(control).boundingBox();
          assert.ok(box && box.width>=44 && box.width<=48 && box.height>=44,'Film controls are compact icons, not text boxes');
          assert.ok(await page.locator(control).getAttribute('aria-label'),'Icon has an accessible action name');
          const contrast=await page.locator(control).evaluate(el=>{
            const rgba=getComputedStyle(el).backgroundColor.match(/[\d.]+/g).map(Number);
            const alpha=rgba[3]??1;
            const luminance=rgba.slice(0,3).map(c=>(c*alpha+255*(1-alpha))/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
            return 1.05/(luminance+.05);
          });
          assert.ok(contrast>=3,'White film icons retain 3:1 contrast even over a white frame');
        }
        const playBox=await page.locator('[data-media-play]').boundingBox();
        const motionBox=await page.locator('[data-motion-toggle]').boundingBox();
        assert.ok(Math.abs(playBox.y-motionBox.y)<=1,'Film controls align even with a visible scrollbar');
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Header fits ${width}px`);
      }
    });
    await check(`${locale || 'en/'} rocket photo responds to scroll and respects reduced motion`, async () => {
      await page.setViewportSize({width:1440,height:1000}); await page.emulateMedia({reducedMotion:'no-preference'});
      await page.goto(`${base}/${locale}index.html`);
      const scene = page.locator('[data-rocket-scene]');
      assert.equal(await scene.count(),1,'One intentional photo-led scroll scene');
      const image = scene.locator('img');
      assert.ok((await image.getAttribute('src')).endsWith('rocket-detail.webp'));
      await image.scrollIntoViewIfNeeded(); await image.evaluate(el=>el.decode());
      const top = await scene.evaluate(el=>el.getBoundingClientRect().top+scrollY);
      await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top-400);
      await page.waitForTimeout(100);
      const before = await page.locator('[data-rocket-motion]').evaluate(el=>getComputedStyle(el).transform);
      await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top+200);
      await page.waitForFunction(prior=>getComputedStyle(document.querySelector('[data-rocket-motion]')).transform!==prior,before);
      await page.emulateMedia({reducedMotion:'reduce'});
      assert.equal(await page.locator('[data-rocket-motion]').evaluate(el=>getComputedStyle(el).transform),'none');
      assert.ok(await scene.locator('h2').isVisible(),'Motion never gates the story content');
    });
    await context.close();
  }
  assert.deepEqual(failures,[],'Minimal editorial polish');
}
if (require.main===module) (async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{await checkPolish(browser);}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={checkPolish};
