const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {chromium} = require('C:/Users/tae06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PSI_URL || 'http://127.0.0.1:8766';

// These independent source fixtures catch missing teams, stale April topics and
// current/history mixing in the generated reader-facing research index.
const titles = [
  '단 분리 로켓의 과도 동역학 기반 점화 안전 한계선 정의 및 자율 점화 시스템 개발',
  'PPO 기반 잔차 제어를 이용한 무인항공기의 강건한 정밀 착륙 기법',
  '재사용 발사체 기술 개발을 위한 전기식 TVC 수직이착륙 시연체의 개발 및 제어',
  '120 N급 End-burning 하이브리드 로켓용 환형 스월 인젝터의 설계 모델',
  '게인 스케줄링 PID 제어를 이용한 아음속 사운딩 로켓의 테일핀 제어 시스템 개발'
];

async function checkCurrentContent(browser) {
  const failures = [];
  const check = async (name, run) => {
    try { await run(); console.log(`PASS: ${name}`); }
    catch(error) { failures.push(`${name}: ${error.message}`); }
  };
  for (const locale of ['', 'ko/']) {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    const page = await context.newPage();
    try {
      await check(`${locale || 'en/'} five current studies remain distinct from historical records`, async () => {
        await page.goto(`${base}/${locale}research.html`);
        assert.equal(await page.locator('[data-current-research]').count(),5,'Five current research records must exist');
        const current = page.locator('#current-research');
        const text = await current.textContent();
        for (const title of titles) assert.ok(text.includes(title),`Missing current manuscript: ${title}`);
        assert.doesNotMatch(text,/canard|카나드|moving.platform landing/i,'Old April topics must not replace current research');
        assert.equal(await current.locator('.current-stage:visible').count(),5,'Stage boundaries stay visible when details are closed');
        assert.match(await current.locator('.current-research-status').textContent(),/Ongoing|진행 중/);
        const details = current.locator('details').first();
        await details.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.ok(await details.evaluate(el=>el.open),'Keyboard opens native research details');
        assert.ok(await details.locator('[data-research-method]').isVisible());
        assert.ok(await details.locator('[data-research-next]').isVisible());
        assert.equal(await page.locator('[data-research-item]:visible').count(),15,'The historical archive remains separate and complete');
        await page.locator('[data-filter-type]').selectOption('award');
        assert.equal(await page.locator('[data-research-item]:visible').count(),6,'Historical award filter still works');
        assert.equal(await page.locator('[data-current-research]:visible').count(),5,'Archive filters cannot hide ongoing research');
        await page.locator('[data-filter-reset]').click();
        assert.equal(await page.locator('[data-research-item]:visible').count(),15);
        assert.equal(await current.locator('a[href*="sharepoint"],a[href*="onedrive"]').count(),0,'Private manuscript storage must not be linked');
      });
      await check(`${locale || 'en/'} first study reaches the initial research viewport`, async () => {
        await page.setViewportSize({width:1000,height:792});
        await page.goto(`${base}/${locale}research.html`);
        await page.evaluate(()=>document.fonts.ready);
        const first = page.locator('[data-current-research]').first();
        assert.ok((await first.locator('h3').boundingBox()).y<520,'First study heading begins before 520px');
        assert.ok((await first.locator('.current-stage').boundingBox()).y<792,'The first stage boundary begins in the initial viewport');
      });
      await check(`${locale || 'en/'} current Avionics responsibilities and pinned versions are delivered`, async () => {
        await page.goto(`${base}/${locale}projects.html#avionics`);
        const avionics = page.locator('#avionics');
        const text = await avionics.textContent();
        assert.match(text,/M7/); assert.match(text,/M4/);
        assert.match(text,/100\s?Hz/); assert.match(text,/50\s?Hz/); assert.match(text,/25\s?Hz/);
        assert.match(text,/integrated|통합/);
        assert.doesNotMatch(text,/three.axis acceleration plots|three separate windows|three.window|3D 자세 모델과 비행 상태, GNSS 기반 경로, 3축 가속도 그래프/);
        assert.ok(await avionics.locator('a[href*="7cfb5be044e539c2e3c6d79a6538416a2741cd67"]').count()>0,'Current source is pinned');
        assert.ok(await page.locator('#tms a[href*="abb02a09bca4e7835425dc67b2c28234ef887992"]').count()>0,'TMS retains its verified version');
        assert.equal(await page.locator('.selection-list').count(),0,'Stale April team-selection section is replaced');
      });
      await page.goto(`${base}/${locale}research.html`);
      for (const width of [320,390,768,1440]) {
        await page.setViewportSize({width,height:1000});
        for (const theme of ['light','dark']) {
          await page.locator('[data-theme-select]').selectOption(theme);
          await check(`${locale || 'en/'} ${theme} research fits ${width}px`, async () => {
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
          });
        }
      }
    } finally { await context.close(); }
    const fallback = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    try {
      const plain = await fallback.newPage();
      await check(`${locale || 'en/'} research method and next step are available without JavaScript`, async () => {
        await plain.goto(`${base}/${locale}research.html`);
        assert.equal(await plain.locator('[data-current-research]').count(),5);
        const details = plain.locator('[data-current-research] details').last();
        await details.locator('summary').click();
        assert.ok(await details.locator('[data-research-method]').isVisible());
        assert.ok(await details.locator('[data-research-next]').isVisible());
      });
    } finally { await fallback.close(); }
  }
  for (const file of ['index.html','projects.html','research.html','ko/index.html','ko/projects.html','ko/research.html']) {
    const html=fs.readFileSync(path.join(__dirname,file),'utf8');
    assert.doesNotMatch(html,/postechackr\.sharepoint|sourcedoc=|1DACC425|F9C0CDC2|AFECC867/,'No private manuscript identifiers in generated pages');
  }
  assert.deepEqual(failures,[],'Current content checks');
}
if(require.main===module)(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{await checkCurrentContent(browser);}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
module.exports={checkCurrentContent};
