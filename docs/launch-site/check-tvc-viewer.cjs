const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||'msedge'});
 const base=process.env.PSI_URL||'http://127.0.0.1:8870';
 try{
  for(const lang of ['', 'ko/']){
   const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const modelRequests=[];page.on('request',r=>{if(r.url().endsWith('.stl'))modelRequests.push(r.url());});
   await page.goto(`${base}/${lang}research.html`);
   const figure=page.locator('#electric-tvc .cad-figure');
   await figure.scrollIntoViewIfNeeded();
   assert.equal(await figure.locator('[data-tvc-start]').count(),1,'CAD offers a real 3D viewer');
   assert.equal(modelRequests.length,0,'Model is not downloaded before intent');
   const buttonColors=await figure.locator('[data-tvc-start]').evaluate(el=>[getComputedStyle(el).color,getComputedStyle(el).backgroundColor]);
   assert.notEqual(buttonColors[0],buttonColors[1],'3D start text contrasts with its background');
   await figure.locator('[data-tvc-start]').click();
   await figure.locator('canvas').waitFor({state:'visible'});
   await page.waitForFunction(()=>document.querySelector('[data-tvc-viewer]')?.dataset.state==='ready');
   const canvas=figure.locator('canvas');
   const initial=await canvas.screenshot();
   await canvas.focus();await canvas.press('ArrowRight');
   assert.notDeepEqual(await canvas.screenshot(),initial,'Arrow keys rotate actual rendered geometry');
   const rotated=await canvas.screenshot();
   await figure.locator('[data-tvc-zoom="in"]').click();
   assert.notDeepEqual(await canvas.screenshot(),rotated,'Zoom changes rendered geometry');
   await figure.locator('[data-tvc-reset]').click();
   assert.deepEqual(await canvas.screenshot(),initial,'Reset restores initial view');
   const box=await canvas.boundingBox();
   await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();
   await page.mouse.move(box.x+box.width*.65,box.y+box.height*.6,{steps:8});await page.mouse.up();
   assert.notDeepEqual(await canvas.screenshot(),initial,'Pointer dragging rotates model');
   await canvas.screenshot({path:`docs/launch-site/review/tvc-${lang?'ko':'en'}.png`});
   await page.setViewportSize({width:320,height:800});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Viewer fits narrow screens');
   await figure.locator('[data-tvc-close]').click();
   assert.equal(await figure.locator('.cad-board').isVisible(),true,'Static CAD can be restored');
   assert.deepEqual(errors,[]);
   await page.close();
  }
  const failed=await browser.newPage();
  await failed.route('**/*.stl',r=>r.abort());
  await failed.goto(`${base}/research.html`);
  await failed.locator('[data-tvc-start]').click();
  await failed.waitForFunction(()=>document.querySelector('[data-tvc-viewer]')?.dataset.state==='error');
  assert.equal(await failed.locator('#electric-tvc .cad-board').isVisible(),true,'Failed download keeps original CAD visible');
  assert.equal(await failed.locator('[data-tvc-start]').isEnabled(),true,'Failed download can be retried');
  await failed.close();
  const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(`${base}/research.html`);
  assert.equal(await nojs.locator('#electric-tvc .cad-board img').count(),1,'No-JS CAD fallback remains');
  await nojs.close();
  console.log('PASS TVC bilingual lazy load, actual rotation/zoom/reset, mobile, load error and no-JS fallback');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
