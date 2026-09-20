const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base=process.env.PSI_URL||'http://127.0.0.1:8870';
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||'msedge'});
 try{
  for(const locale of ['', 'ko/'])for(const route of ['index','pslv']){
   const page=await browser.newPage();
   await page.goto(`${base}/${locale}${route}.html`);
   await page.locator('[data-media="onboard"]').click();
   await page.waitForFunction(()=>{const v=document.querySelector('[data-flight-video]');return !v.paused&&v.currentTime>.2;},null,{timeout:8000});
   assert.ok(await page.locator('[data-flight-video]').evaluate(v=>v.muted&&v.controls&&!v.loop));
   await page.locator('[data-flight-video]').focus();await page.keyboard.press('Space');
   assert.ok(await page.locator('[data-flight-video]').evaluate(v=>v.paused));
   await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
   await page.locator('[data-media="onboard"]').click();
   assert.ok(await page.locator('[data-flight-video]').evaluate(v=>v.paused));
   await page.locator('[data-media-play]').click();
   await page.waitForFunction(()=>document.querySelector('[data-flight-video]').currentTime>.2);
   await page.close();
  }
  console.log('PASS: both locales and film locations autoplay onboard muted, retain pause/native controls and respect reduced motion');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
