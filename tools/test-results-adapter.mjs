// Every integration patch is explicit; immutable originals live beside output.
function replaceFunction(source,name,next){const start=source.indexOf(`  function ${name}(`);const end=source.indexOf('\n  function ',start+5);if(start<0||end<0)throw Error('Missing upstream function '+name);return source.slice(0,start)+next+'\n'+source.slice(end);}
function once(source,from,to){if(!source.includes(from))throw Error('Upstream patch target missing: '+from);return source.replace(from,to);}
export function adaptController(source){
 source=once(source,'(function () {','export async function createController(host, PAGE, catalogInput) {');
 source=once(source,'  const PAGE = window.PSI_PAGE_CONFIG || { page: "home", rootPath: "." };',`  const realDocument = globalThis.document;
  const shadow = host.shadowRoot || host.attachShadow({mode: 'open'});
  shadow.innerHTML = '<link rel="stylesheet" href="' + new URL('results.css', PAGE.rootPath).href + '"><div class="results-body"></div>';
  const body = shadow.querySelector('.results-body');
  const events = new AbortController();
  const document = {
    baseURI: realDocument.baseURI, body,
    getElementById: id => shadow.getElementById(id),
    querySelector: selector => shadow.querySelector(selector),
    querySelectorAll: selector => shadow.querySelectorAll(selector),
    createElement: tag => realDocument.createElement(tag),
    addEventListener: (type, fn) => shadow.addEventListener(type, fn, {signal: events.signal}),
    removeEventListener: (type, fn) => shadow.removeEventListener(type, fn)
  };
  const echarts = globalThis.echarts, PSICharts = globalThis.PSICharts;
  let disposed = false;
  function applyOption(entry) {
    const prior = entry.instance.getOption() || {};
    const option = entry.build(entry.legendSelected);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) option.animation = false;
    if (prior.dataZoom && option.dataZoom) option.dataZoom = option.dataZoom.map((z,i) => ({...z, start:prior.dataZoom[i]?.start, end:prior.dataZoom[i]?.end}));
    if (entry.legendSelected && option.legend) option.legend.selected = entry.legendSelected;
    entry.instance.setOption(option, true);
  }`);
 source=once(source,'  let catalog = null;','  let catalog = catalogInput;');
 source=replaceFunction(source,'resolvePath',`  function resolvePath(path) {
    if (!path) return null;
    if (/^https?:\\/\\//i.test(path)) return path;
    const local = path === 'tests/index.json' || path.endsWith('pipeline_data.txt');
    return new URL(path, local ? new URL('upstream/', PAGE.rootPath) : 'https://postech-psi.github.io/test-results/').href;
  }`);
 source=replaceFunction(source,'setDocumentMeta','  function setDocumentMeta() {}');
 source=once(source,'const n = Number(cells[index]);','const n = cells[index] == null || cells[index].trim() === "" ? NaN : Number(cells[index]);');
 source=source.replaceAll('entry.instance.setOption(entry.build(entry.legendSelected), true);','applyOption(entry);');
 source=replaceFunction(source,'renderHome',`  function renderHome() {
    document.body.innerHTML = buildComparisonPanel(catalog.tests);
    bindCommonControls(); bindHomeControls(); updateComparison();
  }`);
 source=replaceFunction(source,'bindCommonControls','  function bindCommonControls() { bindTablistKeyboard(); }');
 source=once(source,'      ${renderHeader()}',''); // only remaining renderDetail header
 source=once(source,'<h1 class="detail-hero__title">','<h3 class="detail-hero__title">');
 source=once(source,'${localize(test.title)}</h1>','${localize(test.title)}</h3>');
 source=once(source,'<p class="detail-hero__lead">${localize(test.summary)}</p>',`<p class="detail-hero__lead">\${localize(test.summary)}</p>
          <div class="results-observations">\${test.date === '2026-04-03' ? '<ul>' + localize(test.highlights).slice(1).map(item => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul>' : (!test.issues ? '<p>' + (state.lang === 'ko' ? '공개 기록에 별도 문제가 기재되어 있지 않지만 결함 없는 실험이라는 뜻은 아닙니다.' : 'No issues are listed in the published record; this does not establish a fault-free experiment.') + '</p>' : '')}</div>`);
 source=once(source,'<a class="detail-hero__back" href="${resolvePath("index.html")}">← ${copy("common.backToSite")}</a>','');
 // Figures remain source links: avoid loading a duplicate gallery below charts.
 const figureStart=source.indexOf('        <section class="section">\n          <div class="section-heading"><h2>${copy("common.exportedFigures")}');
 const figureEnd=source.indexOf('      </main>',figureStart);
 if(figureStart<0||figureEnd<0)throw Error('Missing figure boundary');
 source=source.slice(0,figureStart)+source.slice(figureEnd);
 source=replaceFunction(source,'renderError',`  function renderError() { throw new Error(copy('common.loadError')); }`);
 const start=source.indexOf('  async function init()');
 source=source.slice(0,start)+`  state.lang = realDocument.documentElement.lang === 'ko' ? 'ko' : 'en';
  state.theme = realDocument.documentElement.dataset.theme || 'light';
  host.dataset.theme = state.theme;
  await new Promise((resolve, reject) => { const sheet = shadow.querySelector('link'); if (sheet.sheet) resolve(); else {sheet.onload = resolve; sheet.onerror = reject;} });
  await Promise.all(catalog.tests.map(test => ensureSeries(test)));
  state.selectedTestIds = catalog.tests.map(test => test.id);
  state.selectedTestId = catalog.tests[0].id;
  rerender();
  const resize = () => { if (disposed) return; chartRegistry.forEach(entry => {entry.instance.resize(); entry.syncEventAxisOverlay?.();}); };
  const observer = new ResizeObserver(resize); observer.observe(host);
  const themeObserver = new MutationObserver(() => {
    state.theme = realDocument.documentElement.dataset.theme || 'light';
    host.dataset.theme = state.theme;
    if (PAGE.page === 'detail') updateDetailChart(catalog.tests.find(test => test.id === PAGE.testId));
    else updateComparison();
  });
  themeObserver.observe(realDocument.documentElement, {attributes:true, attributeFilter:['data-theme']});
  await new Promise(resolve => requestAnimationFrame(resolve)); resize();
  return {
    select(testId) { PAGE.testId = testId; disposeAllCharts(); state.comparisonTab = 'thrust'; rerender(); resize(); },
    dispose() { disposed = true; observer.disconnect(); themeObserver.disconnect(); events.abort(); disposeAllCharts(); shadow.replaceChildren(); }
  };
}\n`;
 return '// Generated from pinned upstream site.js. Edit tools/test-results-adapter.mjs.\n'+source.replace(/^[ \t]+$/gm,'');
}
export function adaptStyles(source){
 return source.replace(/@font-face\s*\{[^}]+\}/,'').replaceAll(':root',':host').replaceAll('body[data-theme="dark"]',':host([data-theme="dark"])').replace(/\bbody\b/g,'.results-body')+`
/* Scoped mounting layout only; graph styles above are upstream. */
:host { display:block; min-width:0; font-family:var(--font-sans); }
.results-body { min-height:0; }
.site-shell { width:100%; margin:0; }
.section { margin:0; padding:24px 0; }
.detail-hero { padding:32px 0 0; }
.detail-hero__title { font-size:clamp(24px,4vw,42px); }
.footer { display:none; }
[hidden] { display:none !important; }
.sr-table { table-layout:fixed; }
@media(max-width:600px) { .panel {padding:12px;} .toolbar__group {flex-wrap:wrap;} .detail-table th,.detail-table td {overflow-wrap:anywhere;} .detail-grid {min-width:0;} }
@media(prefers-reduced-motion:reduce) { *,*::before,*::after {animation:none!important;transition:none!important;scroll-behavior:auto!important;} }
`;
}
export function adaptCharts(source){
 source=once(source,'  function fmt(value, digits) {',`  function escapeHtml(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(value, digits) {`);
 source=source.replaceAll('it.marker + it.seriesName','it.marker + escapeHtml(it.seriesName)').replaceAll('+ it.name +','+ escapeHtml(it.name) +').replaceAll('+ params.title +','+ escapeHtml(params.title) +').replaceAll('+ disp +','+ escapeHtml(disp) +');
 return source;
}
