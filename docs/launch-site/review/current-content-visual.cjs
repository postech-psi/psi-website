const {setTheme} = require('../test-helpers.cjs');
// Reproducible visual checkpoints for the current-content task, not published assets.
const path = require('node:path');
const {chromium} = require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PSI_URL || 'http://127.0.0.1:8767';
(async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    for (const locale of ['', 'ko/']) for (const width of [390,1440]) for (const theme of ['light','dark']) {
      const context = await browser.newContext({viewport:{width,height:1000}});
      const page = await context.newPage();
      await page.goto(`${base}/${locale}research.html`);
      await setTheme(page,theme);
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:path.join(__dirname,`current-research-${locale?'ko':'en'}-${width}-${theme}.png`)});
      await page.locator('[data-current-research] summary').first().click();
      await page.locator('[data-current-research]').first().screenshot({path:path.join(__dirname,`current-research-open-${locale?'ko':'en'}-${width}-${theme}.png`)});
      await page.goto(`${base}/${locale}projects.html#avionics`);
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('#avionics').screenshot({path:path.join(__dirname,`current-avionics-${locale?'ko':'en'}-${width}-${theme}.png`)});
      await context.close();
    }
  } finally {await browser.close();}
  console.log('Captured 24 current-research / expanded-study / Avionics views: EN + KO, 390 + 1440, light + dark.');
})().catch(error=>{console.error(error);process.exitCode=1;});
