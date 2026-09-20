const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||'msedge'});
 try{
  for(const lang of ['', 'ko/']){
   const page=await browser.newPage({colorScheme:'dark'});
   await page.goto(`${process.env.PSI_URL||'http://127.0.0.1:8870'}/${lang}index.html`);
   assert.equal(await page.locator('html').getAttribute('data-theme'),'light','New visitors see light despite OS dark');
   await page.locator('[data-theme-toggle]').click();await page.reload();
   assert.equal(await page.locator('html').getAttribute('data-theme'),'dark','Explicit dark choice persists');
   await page.emulateMedia({colorScheme:'light'});
   assert.equal(await page.locator('html').getAttribute('data-theme'),'dark','OS change does not override choice');
   await page.evaluate(()=>localStorage.setItem('psi-theme','bad-value'));await page.reload();
   assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Invalid preference falls back to light');
   // Test the inline boot separately with deferred scripts unavailable: prevents a dark first paint.
   await page.route('**/site.js*',r=>r.abort());
   await page.evaluate(()=>localStorage.removeItem('psi-theme'));await page.emulateMedia({colorScheme:'dark'});await page.reload();
   assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Initial boot is also light');
   await page.close();
  }
  console.log('PASS light default on dark OS, explicit preference persistence, invalid preference and initial paint');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
