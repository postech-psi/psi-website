const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge'});
 try{
  for(const lang of ['', 'ko/']){
   const page=await browser.newPage({viewport:{width:1440,height:950}});
   await page.goto(`${process.env.PSI_URL||'http://127.0.0.1:8870'}/${lang}about.html`);
   const frame=page.locator('.about-team [data-living-photo]');
   assert.equal(await frame.count(),1,'Existing team photograph has a motion frame');
   await frame.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>document.querySelector('.about-team [data-living-photo]').dataset.playing==='true');
   const img=frame.locator('img'),button=frame.locator('button');
   assert.ok(await img.evaluate(el=>el.getAnimations().some(a=>a.playState==='running')));
   await button.click();
   assert.equal(await img.evaluate(el=>el.getAnimations().filter(a=>a.playState==='running').length),0,'Photo can be paused');
   await button.click();
   await page.waitForFunction(()=>document.querySelector('.about-team img').getAnimations().some(a=>a.playState==='running'));
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForFunction(()=>!document.querySelector('.about-team img').getAnimations().some(a=>a.playState==='running'),{},{timeout:250});
   await page.setViewportSize({width:320,height:800});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.close();
  }
  console.log('PASS bilingual living photographs, pause/resume, reduced motion and mobile width');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
