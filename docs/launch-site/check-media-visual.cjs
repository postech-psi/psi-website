const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {setTheme}=require('./test-helpers.cjs');
const path=require('node:path');
const base=process.env.PSI_URL||'http://127.0.0.1:8767';
(async()=>{
 const browser=await chromium.launch({channel:process.env.PSI_BROWSER_CHANNEL||undefined,headless:true});
 try{
  for(const locale of ['', 'ko/'])for(const theme of ['light','dark'])for(const width of [320,390,768,1440]){
   const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
   const page=await context.newPage();
   for(const route of ['index','research','news']){
    await page.goto(`${base}/${locale}${route}.html`);await setTheme(page,theme);await page.evaluate(()=>document.fonts.ready);
    for(const image of await page.locator('main img:visible').all()){
     await image.scrollIntoViewIfNeeded();await image.evaluate(img=>img.decode());
     assert.ok(await image.evaluate(img=>img.complete&&img.naturalWidth>0),'Every visible image must actually load');
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route}/${locale}/${theme}/${width} fits`);
    const stem=path.join(__dirname,'review',`task3-${locale?'ko':'en'}-${theme}-${width}-${route}`);
    if(route==='index'){
     const reel=page.locator('[data-photo-reel]');await reel.scrollIntoViewIfNeeded();
     for(let i=0;i<4;i++){
      await page.locator(`[data-reel-dot="${i}"]`).click();await page.locator(`[data-reel-slide="${i}"] img`).evaluate(img=>img.decode());
      await reel.screenshot({path:`${stem}-reel-${i}.png`});
     }
     await page.locator('[data-reel-dot="0"]').click();
    }
    if(route==='research'){
     const board=page.locator('.cad-board');await board.scrollIntoViewIfNeeded();
     const geometry=await board.evaluate(el=>{const b=el.getBoundingClientRect(),im=el.querySelector('img').getBoundingClientRect(),s=im.width/3251;return {board:{x:b.x,y:b.y,right:b.right,bottom:b.bottom},model:{x:im.x+1160*s,y:im.y+366*s,right:im.x+1916*s,bottom:im.y+1569*s,height:1203*s},background:getComputedStyle(el).backgroundColor};});
     assert.ok(geometry.model.x>geometry.board.x&&geometry.model.y>geometry.board.y&&geometry.model.right<geometry.board.right&&geometry.model.bottom<geometry.board.bottom,'All verified hardware remains inside CAD viewport');
     assert.ok(geometry.model.height>(geometry.board.bottom-geometry.board.y)*.8,'CAD hardware occupies the board');
     assert.equal(geometry.background,'rgb(233, 237, 240)');
     await page.locator('.cad-figure').screenshot({path:`${stem}-cad.png`});
    }
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${stem}.png`,fullPage:true});
   }
   await context.close();console.log(`PASS: loaded media, CAD bounds, screenshots ${locale||'en'} ${theme} ${width}`);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
