const {setTheme} = require('./test-helpers.cjs');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.PSI_URL||'http://127.0.0.1:8767';
const portal='https://postech-psi.github.io/test-results/';
async function checkEngineering(browser){
 const errors=[];
 for(const locale of ['', 'ko/']){
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
  for(const [name,run] of [
   ['program links remain keyboard accessible',async()=>{
    await page.goto(`${base}/${locale}index.html`);
    assert.equal(await page.locator('[data-program]').count(),2);
   }],
   ['Avionics chapters and source boundaries',async()=>{
    await page.goto(`${base}/${locale}pslv.html#avionics`);assert.ok(await page.locator('[data-system]').count());
    assert.equal(await page.locator('.site-nav [aria-current=page]').getAttribute('href'),'projects.html');
    assert.equal(await page.locator('[data-language-link]').getAttribute('href'),locale?'../pslv.html#avionics':'ko/pslv.html#avionics');
    for(const id of ['architecture','estimation','ground-station','flight-record'])assert.equal(await page.locator(`#${id}`).count(),1);
    const text=await page.locator('#main').innerText();
    if(!locale)assert.ok(text.includes('A separate transmission thread forwards framed, checksum-checked inter-core messages containing measurements and status.'),'Transmission thread forwards queued frames; it does not assemble them');
    for(const term of ['M7','M4','100 Hz','50 Hz','25 Hz','IMU','BMP390','GNSS','UKF','microSD','XBee'])assert.ok(text.includes(term),term);
    assert.match(await page.locator('[data-gnss-boundary]').innerText(),locale?/입력.*아닙니다/:/not inputs/);
    assert.equal(await page.locator('[data-architecture-flow] li').count(),4,'Four actual responsibility stages are readable');
    assert.match(text,locale?/소프트웨어.*도식/:/software.*diagram/);
    assert.ok(await page.locator('a[href*="7cfb5be044e539c2e3c6d79a6538416a2741cd67"]').count()>=5);
    assert.equal(await page.locator('[data-telemetry]').count(),1);
    assert.equal(await page.locator('[data-trace-segment]').count(),8);
    assert.match(text,locale?/이륙 시점.*뜻하지/:/not liftoff/);
   }],
   ['TMS processing, real figures and dated results',async()=>{
    await page.goto(`${base}/${locale}pslv.html#tms`);assert.ok(await page.locator('[data-system]').count());
    assert.equal(await page.locator('.site-nav [aria-current=page]').getAttribute('href'),'projects.html');
    assert.equal(await page.locator('[data-language-link]').getAttribute('href'),locale?'../pslv.html#tms':'ko/pslv.html#tms');
    for(const id of ['instrument','processing','test-results'])assert.equal(await page.locator(`#${id}`).count(),1);
    const text=await page.locator('#main').innerText();
    for(const term of ['320','860','ADS1115','kg'])assert.ok(text.includes(term),term);
    assert.match(text,locale?/오프라인/:/offline/);assert.match(text,locale?/일정한 오프셋/:/constant offset/);
    assert.match(text,locale?/타임스탬프.*아니라/:/rather than individual sample timestamps/);
    assert.ok(await page.locator(`a[href="${portal}"]`).count()>0);
    assert.ok(await page.locator(`a[href="${portal}#comparison"]`).count()>0);
    assert.equal(await page.locator('[data-test-result]').count(),4);
    const {resultCatalog}=await import('./test-results-view.mjs');
    for(const test of resultCatalog.tests){
      const record=page.locator(`[data-test-result="${test.id}"]`);
      assert.ok((await record.innerText()).includes(test.date));
      assert.ok(await record.locator('a[href$="index.md"]').count());
      const row=page.locator('[data-results-fallback] tbody tr').filter({hasText:test.date});
      for(const metric of ['maxThrustN','totalImpulseNs'])assert.ok((await row.innerText()).includes(test.metrics[metric].display));
    }
    assert.match(await page.locator('[data-test-result="2026-07-16-combustion"]').innerText(),locale?/압력.*이상/:/pressure.*anomal/i);
    assert.match(await page.locator('[data-test-result="2026-04-03-combustion"]').innerText(),locale?/움직임.*화재/:/movement.*fire/);
    for(const file of ['tms-loadcell-calibration.webp']){
      const img=page.locator(`img[src$="${file}"]`);assert.equal(await img.count(),1);await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
      assert.notEqual(await img.evaluate(el=>getComputedStyle(el).objectFit),'cover');
      assert.equal(await img.evaluate(el=>getComputedStyle(el).filter),'none');
      assert.ok(await img.evaluate(el=>el.getBoundingClientRect().width<=el.naturalWidth+1),'Source figure is not upscaled');
      assert.ok(await img.locator('xpath=ancestor::figure').locator('a[href$=".png"]').count());
    }
   }],
   ['overview links, canonical player and selected display weight',async()=>{
    await page.goto(`${base}/${locale}pslv.html`);
    for(const name of ['avionics','tms']){assert.ok(await page.locator(`#systems [data-system="${name}"] > summary`).count());}
    assert.equal(await page.locator('[data-telemetry]').count(),1,'PSLV owns the sole replay');
    assert.equal(await page.locator('a[href="avionics.html"]').count(),0);
    await page.goto(`${base}/${locale}index.html`);
    assert.ok(await page.locator(`a.button[href="pslv.html#test-results"]`).count(),'Home leads to integrated results');
    assert.equal(await page.locator('[data-program]').count(),2);
    await page.goto(`${base}/${locale}records.html`);
    const {resultCatalog}=await import('./test-results-view.mjs');
    for(const test of resultCatalog.tests)assert.ok(await page.locator(`a[href="pslv.html?test=${test.id}#test-results"]`).count());
   }],
   ['anchors account for the nonsticky header',async()=>{
    await page.setViewportSize({width:390,height:844});
    for(const [route,selector]of [['pslv.html#avionics','.case-nav a[href="#estimation"]'],['news.html','.album-navigation a']]){
      await page.goto(`${base}/${locale}${route.includes('.html')?route:'pslv.html#'+route}`);
      const anchor=page.locator(selector).first(),href=await anchor.getAttribute('href');
      await anchor.click();
      const box=await page.locator(href).boundingBox();
      assert.ok(box.y>=0&&box.y<=42,'Anchor target starts near the viewport top without obsolete fixed-header space');
    }
    await page.goto(`${base}/${locale}research.html`);
    const article=page.locator('[data-current-research]').last();
    await article.evaluate(el=>el.scrollIntoView());
    const box=await article.boundingBox();
    assert.ok(box.y>=0&&box.y<=42,'Research anchor has only a modest inset');
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto','Reduced motion keeps anchor movement immediate');
   }],
   ['new chapters fit both themes at four widths',async()=>{
    for(const route of ['avionics','tms'])for(const width of [320,390,901,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:1000});const response=await page.goto(`${base}/${locale}${route}.html`);assert.equal(response.status(),200);
      await setTheme(page,theme);await page.evaluate(()=>document.fonts.ready);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${route}/${theme} fits ${width}px`);
    }
    await page.setViewportSize({width:320,height:1000});
    for(const route of ['avionics','tms']){
      await page.goto(`${base}/${locale}${route}.html`);
      for(const heading of await page.locator('.case-heading h3,.case-chapter>h3').all()){
        const joins=await heading.evaluate(el=>[...el.querySelectorAll('br')].filter(br=>getComputedStyle(br).display==='none').map(br=>[br.previousSibling?.textContent||'',br.nextSibling?.textContent||'']));
        for(const [before,after]of joins)assert.ok(/\s$/.test(before)||/^\s/.test(after),'Hidden responsive heading break retains word separation');
      }
    }
   }]
  ])try{await run();console.log(`PASS: ${locale||'en/'} ${name}`);}catch(e){errors.push(`${locale||'en/'} ${name}: ${e.message}`);}
  await context.close();
  const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  try{const p=await plain.newPage();for(const route of ['avionics','tms']){assert.equal((await p.goto(`${base}/${locale}pslv.html`)).status(),200);await p.locator(`[data-system="${route}"] > summary`).click();assert.ok(await p.locator(`[data-system="${route}"] .case-chapter`).count()>=3,'Every static chapter is present');assert.ok((await p.locator('#main').innerText()).length>2000,'Substantive static chapters remain without JavaScript');}console.log(`PASS: ${locale||'en/'} static engineering content`);}catch(e){errors.push(`${locale||'en/'} no-JavaScript: ${e.message}`);}finally{await plain.close();}
 }
 assert.deepEqual(errors,[],'Engineering case-study checks');
}
if(require.main===module)(async()=>{const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||undefined,headless:true});try{await checkEngineering(browser);}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
module.exports={checkEngineering};
