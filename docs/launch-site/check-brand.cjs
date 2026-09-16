const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.PSI_URL||'http://127.0.0.1:8766';
async function checkBrand(browser){
  const failures=[];
  for(const locale of ['', 'ko/']){
    const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',colorScheme:'light'});
    const page=await context.newPage();
    for(const [name,run] of [
      ['approved display face without synthetic weight',async()=>{
        await page.goto(`${base}/${locale}index.html`);await page.evaluate(()=>document.fonts.ready);
        const heading=await page.locator('.hero-identity h1').evaluate(el=>({family:getComputedStyle(el).fontFamily,weight:getComputedStyle(el).fontWeight}));
        assert.ok(heading.family.includes(locale?'Pretendard':'Barlow Semi Condensed'),'Heading uses the approved locale family');
        if(!locale)assert.equal(heading.weight,'600');
        assert.ok(await page.evaluate(()=>[...document.fonts].some(face=>face.family.includes('Barlow Semi Condensed')&&face.status==='loaded')),'Display font loaded');
      }],
      ['neutral identity palette',async()=>{
        await page.goto(`${base}/${locale}index.html`);
        for(const theme of ['light','dark']){
          await page.locator('[data-theme-select]').selectOption(theme);
          const colors=await page.evaluate(()=>['canvas','surface','text','secondary','action','border','wash'].map(name=>{
            const probe=document.createElement('span');probe.style.color=`var(--${name})`;document.body.append(probe);
            const color=getComputedStyle(probe).color;probe.remove();return {name,channels:color.match(/[\d.]+/g).slice(0,3).map(Number)};
          }));
          for(const color of colors)assert.ok(Math.max(...color.channels)-Math.min(...color.channels)<=2,`${theme} ${color.name} is neutral: ${color.channels}`);
          assert.equal((await page.locator('meta[name="theme-color"]').getAttribute('content')).toLowerCase(),theme==='dark'?'#000000':'#ffffff');
          assert.equal(await page.locator('.site-header').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(0, 0, 0)','Official wordmark retains a black header');
        }
      }],
      ['native icon preference and responsive header',async()=>{
        await page.goto(`${base}/${locale}index.html`);
        assert.equal(await page.locator('[data-theme-control]').count(),1,'A visible icon preference wrapper exists');
        for(const width of [320,390,901,1440]){
          await page.setViewportSize({width,height:1000});await page.evaluate(()=>document.fonts.ready);
          for(const choice of ['system','light','dark']){
            await page.locator('[data-theme-select]').selectOption(choice);
            assert.equal(await page.locator('html').getAttribute('data-theme-choice'),choice);
            const visible=await page.locator('[data-theme-icon]').evaluateAll(icons=>icons.filter(icon=>getComputedStyle(icon).display!=='none').map(icon=>icon.dataset.themeIcon));
            assert.deepEqual(visible,[choice],'Only the current preference icon is visible');
            const wrapper=await page.locator('[data-theme-control]').boundingBox();
            assert.ok(wrapper.width>=44&&wrapper.height>=44,'Preference target is at least44px');
            const select=await page.locator('[data-theme-select]').evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {opacity:s.opacity,width:r.width,height:r.height,display:s.display};});
            assert.equal(select.opacity,'0','Closed native text is visually replaced by icon');assert.notEqual(select.display,'none');
            assert.ok(select.width>=44&&select.height>=44,'Native selector overlays the actual target');
            const logo=await page.locator('.brand img').boundingBox();
            assert.ok(logo.width>=(width===1440?140:90),`Logo is readable at ${width}px`);
            assert.ok((await page.locator('.brand img').getAttribute('src')).endsWith('assets/psi-logo.png'));
            assert.equal(await page.locator('.brand img').getAttribute('width'),'1280');
            assert.equal(await page.locator('.brand img').getAttribute('height'),'317');
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Header fits ${width}px`);
            const boxes=await page.locator('.brand,[data-theme-control],.language-link,.menu-toggle').evaluateAll(els=>els.filter(el=>getComputedStyle(el).display!=='none').map(el=>el.getBoundingClientRect()).sort((a,b)=>a.left-b.left).map(r=>({left:r.left,right:r.right})));
            assert.ok(boxes.every((r,i)=>!i||r.left>=boxes[i-1].right),`Header control bounds do not overlap at ${width}px`);
          }
        }
      }],
      ['menu releases page at the new navigation breakpoint',async()=>{
        await page.setViewportSize({width:901,height:1000});await page.goto(`${base}/${locale}index.html`);
        await page.locator('[data-menu-toggle]').click();
        assert.equal(await page.locator('main').evaluate(el=>el.inert),true);
        await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(100);
        assert.equal(await page.locator('main').evaluate(el=>el.inert),false,'Desktop resize releases content from the mobile menu');
        assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'),'false');
      }],
      ['preference persistence, system changes and native keyboard',async()=>{
        await page.goto(`${base}/${locale}index.html`);
        const select=page.locator('[data-theme-select]');
        await select.selectOption('system');await page.emulateMedia({colorScheme:'dark'});
        await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
        assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
        assert.equal(await page.locator('html').getAttribute('data-theme-choice'),'system');
        await select.selectOption('light');await page.reload();
        assert.equal(await select.inputValue(),'light');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
        await page.emulateMedia({colorScheme:'light'});await page.emulateMedia({colorScheme:'dark'});
        assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Explicit light wins over OS');
        await select.focus();await page.keyboard.press('End');
        assert.equal(await select.inputValue(),'dark');assert.equal(await page.locator('html').getAttribute('data-theme-choice'),'dark');
        assert.equal(await page.evaluate(()=>localStorage.getItem('psi-theme')),'dark');
        await page.keyboard.press('Home');assert.equal(await select.inputValue(),'system');
        await page.emulateMedia({forcedColors:'active'});await select.focus();
        const focus=await page.locator('[data-theme-control]').evaluate(el=>{const s=getComputedStyle(el);return {width:parseFloat(s.outlineWidth),style:s.outlineStyle,color:s.outlineColor,background:getComputedStyle(el.closest('header')).backgroundColor};});
        assert.ok(focus.width>=2&&focus.style!=='none'&&focus.color!==focus.background,'Forced-colours keyboard focus is visible on wrapper');
        await page.keyboard.press('End');assert.equal(await select.inputValue(),'dark');
        await page.emulateMedia({forcedColors:'none'});
      }]
    ])try{await run();console.log(`PASS: ${locale||'en/'} ${name}`);}catch(error){failures.push(`${locale||'en/'} ${name}: ${error.message}`);}
    await context.close();
  }
  assert.deepEqual(failures,[],'Brand and preference checks');
}
if(require.main===module)(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{await checkBrand(browser);}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
module.exports={checkBrand};
