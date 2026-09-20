const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||'msedge'});
 const base=process.env.PSI_URL||'http://127.0.0.1:8870';
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.goto(`${base}/ko/index.html`);
  await page.evaluate(()=>document.fonts.ready);
  const lines=locator=>locator.evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);return new Set([...range.getClientRects()].filter(r=>r.width>0).map(r=>Math.round(r.top))).size;});
  assert.equal(await lines(page.locator('.archive-preview-copy h2')),1,'The desktop activity heading is not split into two lines');
  assert.equal(await page.locator('.archive-preview-copy .section-context').count(),0,'Remove the redundant activity eyebrow');
  assert.equal(await lines(page.locator('[data-program=pslv] p')),1,'The desktop PSLV summary has no orphaned last word');
  await page.goto(`${base}/ko/pslv.html`);
  await page.evaluate(()=>document.fonts.ready);
  const title=page.locator('.page-head h1');
  assert.equal((await title.innerText()).trim(),'PSLV\nPOSTECH Science Launch Vehicle');
  assert.equal(await page.locator('.page-head .affiliation').count(),0,'Remove the repeated PSI affiliation above the title');
  const name=title.locator('.program-name');
  assert.equal(await lines(name),1,'The full English name fits the desktop title column');
  const styles=await title.evaluate(e=>({title:parseFloat(getComputedStyle(e).fontSize),name:parseFloat(getComputedStyle(e.querySelector('.program-name')).fontSize),sameColor:getComputedStyle(e).color===getComputedStyle(e.querySelector('.program-name')).color}));
  assert.ok(styles.name<styles.title&&styles.name>=styles.title*.5&&styles.sameColor,'The English name is a smaller heading in the same color');
  await page.setViewportSize({width:390,height:844});
  assert.ok(await title.evaluate(e=>e.getBoundingClientRect().right<=innerWidth&&e.scrollWidth<=e.clientWidth+1),'The mobile title wraps without overflowing');
  console.log('PASS title hierarchy, desktop line breaks, removed eyebrows and mobile fit');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
