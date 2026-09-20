const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(`${process.env.PSI_URL||'http://127.0.0.1:8870'}/ko/index.html`);
  await page.evaluate(()=>document.fonts.ready);
  const header=await page.locator('.header-inner').boundingBox();
  const logo=await page.locator('.brand').boundingBox();
  assert.ok(header.height<=88&&header.height>=logo.height+16,'Desktop menu is compact without crowding the existing logo');
  assert.ok(logo.width>=260,'The larger PSI logo is preserved');
  const result=await page.evaluate(async()=>{
   const title=document.querySelector('.home-rocket h2');
   const initial=title.getBoundingClientRect().top+scrollY;
   scrollTo({top:initial-400,behavior:'instant'});
   const start=performance.now(),positions=[];
   await new Promise(done=>{
    const sample=()=>{
     positions.push(title.getBoundingClientRect().top+scrollY);
     if(performance.now()-start<1200)requestAnimationFrame(sample);else done();
    };
    requestAnimationFrame(sample);
   });
   return {initial,min:Math.min(...positions),max:Math.max(...positions),opacity:getComputedStyle(title).opacity};
  });
  assert.ok(Math.abs(result.max-result.initial)<1&&Math.abs(result.min-result.initial)<1,
   `The heading must not jump after scrolling into view: ${JSON.stringify(result)}`);
  assert.equal(result.opacity,'1','The heading remains fully readable after its entrance');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.locator('.home-rocket h2').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('.home-rocket h2').evaluate(h=>h.getAnimations().length),0,'Returning to a heading does not replay its entrance');
  await page.setViewportSize({width:390,height:900});
  assert.ok((await page.locator('.header-inner').boundingBox()).height<=72,'Mobile menu is compact');
  console.log('PASS stable heading entrance, repeat scrolling and compact desktop/mobile menu');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
