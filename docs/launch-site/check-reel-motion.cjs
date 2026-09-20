const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto((process.env.PSI_URL||'http://127.0.0.1:8870')+'/index.html');
  await page.locator('[data-photo-reel]').scrollIntoViewIfNeeded();
  await page.locator('[data-reel-next]').click();
  const ghost=page.locator('[data-reel-transition]');
  assert.equal(await ghost.count(),1,'Previous photo persists briefly for a real crossfade');
  assert.equal(await ghost.getAttribute('aria-hidden'),'true');
  assert.equal(await ghost.locator('a,button').count(),0,'Transition image cannot duplicate a focus target');
  await ghost.waitFor({state:'detached'});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('[data-reel-next]').click();
  assert.equal(await ghost.count(),0,'Reduced motion switches photographs immediately');
  assert.equal(await page.locator('[data-reel-slide]:not([hidden])').count(),1);
  console.log('PASS photo crossfade cleanup, single focus target and reduced-motion switch');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
