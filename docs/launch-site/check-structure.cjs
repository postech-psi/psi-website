const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||undefined});
 const page=await browser.newPage();
 const base=process.env.PSI_BASE_URL||'http://localhost:8870/';
 const {research}=await import('./content.mjs');
 const {resultCatalog}=await import('./test-results-view.mjs');
 try {
 for(const prefix of ['', 'ko/']){
  await page.goto(base+prefix+'index.html');
  assert.equal(await page.locator('[data-program]').count(),2);
  assert.equal(await page.locator('.testing-feature a.button').getAttribute('href'),'tms.html#test-results');
  await page.goto(base+prefix+'projects.html');
  assert.deepEqual(await page.locator('.site-nav a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))),['projects.html','research.html','records.html','news.html','about.html','join.html']);
  assert.equal(await page.locator('[data-program]').count(),2);
  await page.locator('[data-program="aircraft"] a').first().click();
  assert.match(page.url(),/aircraft.html$/);
  assert.equal(await page.locator('a[href="projects.html"]').count()>0,true);
  await page.goto(base+prefix+'research.html');
  assert.equal(await page.locator('[data-current-research]').count(),5);
  assert.equal(await page.locator('[data-current-research] figure').count(),5);
  assert.equal(await page.locator('[data-research-record]').count(),0);
  await page.goto(base+prefix+'records.html');
  assert.equal(await page.locator('[data-research-record]').count(),15);
  for(const r of research)assert.equal(await page.locator('#'+r.id).count(),1);
  assert.equal(await page.locator('[data-filter-type]').count(),1,'Historical evidence remains filterable in Records');
  await page.locator('[data-filter-type]').selectOption('award');
  assert.equal(await page.locator('[data-research-record]:visible').count(),6);
  await page.locator('[data-filter-reset]').click();
  for(const r of research){await page.goto(base+prefix+'research.html#'+r.id);await page.waitForURL(base+prefix+'records.html#'+r.id);}
  for(const [from,to] of [['learning.html','join.html'],['projects.html#avionics','avionics.html'],['projects.html#tms','tms.html'],['news.html#tests','records.html#tests'],['research.html#research-archive','records.html#research-archive'],['research.html#ksas-2025-fusion','records.html#ksas-2025-fusion']]){
   await page.goto(base+prefix+from); await page.waitForURL(base+prefix+(from==='learning.html'?'join.html#learning':to));
  }
  for(const id of [resultCatalog.tests.at(-1).id,'unknown-test']){
   await page.goto(base+prefix+'tms.html?test='+id+'#test-results');
   const selected=resultCatalog.tests.find(t=>t.id===id)||resultCatalog.tests[0];
   assert.equal(await page.locator('[data-results-select]').inputValue(),selected.id);
   await page.locator('[data-results-status="ready"]').waitFor({state:'attached'});
   assert.ok((await page.locator('[data-results-detail] .results-body').innerText()).includes(selected.date),'Requested trial is mounted in the live detail panel');
   assert.equal(await page.locator('.case-back').getAttribute('href'),'pslv.html#systems');
  }
  for(const route of ['projects','aircraft','research','records','news'])for(const width of [390,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(base+prefix+route+'.html');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${prefix}${route} at ${width}`);
   assert.equal(await page.locator('main a[href*="sharepoint"],main a[href*="onedrive"],main iframe').count(),0);
   await page.screenshot({path:require('node:path').join(__dirname,'review',`task2-${prefix?'ko':'en'}-${route}-${width}.png`),fullPage:true});
  }
 }
 console.log('PASS bilingual navigation, two programs, research/records segregation, legacy redirects and validated trial selection');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
