const {chromium}=require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {setTheme}=require('../test-helpers.cjs');
const fs=require('node:fs');
const path=require('node:path');
const base=process.env.PSI_URL||'http://127.0.0.1:8767';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const report=[];
 try{
  const context=await browser.newContext({reducedMotion:'reduce',colorScheme:'light'});
  const page=await context.newPage();
  for(const locale of ['', 'ko/'])for(const width of [390,1440])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:width<650?844:1000});
   for(const [route,section] of [['index','hero'],['index','rocket'],['about','leadership'],['avionics','head'],['tms','head']]){
    await page.goto(base+'/'+locale+route+'.html');
    await setTheme(page,theme);
    await page.evaluate(async()=>{await document.fonts.ready;for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>null)));});
    const selector=section==='rocket'?'.home-rocket':section==='leadership'?'.leadership':null;
    const name='minimal-'+(locale?'ko':'en')+'-'+route+'-'+section+'-'+theme+'-'+width+'.png';
    if(selector)await page.locator(selector).screenshot({path:path.join(__dirname,name)});
    else await page.screenshot({path:path.join(__dirname,name)});
    report.push({name,width,theme,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
   }
  }
  const content=[];
  for(const locale of ['', 'ko/']){
   await page.goto(base+'/'+locale+'about.html');
   content.push({locale:locale||'en',leadership:await page.locator('.leadership dl').innerText()});
   await page.goto(base+'/'+locale+'gallery.html');
   content.push({locale:locale||'en',events:await page.locator('[data-gallery-event]').count(),photos:await page.locator('[data-gallery-open]').count(),springEvent:await page.locator('#community-apr-2025').count()});
  }
  const punctuation=[];
  for(const route of ['index','projects','pslv','avionics','tms','research','learning','about','news','join','gallery']){
   await page.goto(base+'/ko/'+route+'.html');
   const endings=await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(els=>els.filter(el=>/\.\s*$/.test(el.textContent)).map(el=>el.textContent));
   if(endings.length)punctuation.push({route,endings});
  }
  const result={captures:report,content,punctuationFailures:punctuation};
  fs.writeFileSync(path.join(__dirname,'minimal-polish-results.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({captures:report.length,overflow:report.filter(r=>r.overflow),content,punctuationFailures:punctuation},null,2));
  if(report.some(r=>r.overflow)||punctuation.length)process.exitCode=1;
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
