import {readFileSync} from 'node:fs';
export const resultCatalog=JSON.parse(readFileSync(new URL('./assets/results/upstream/tests/index.json',import.meta.url),'utf8'));
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function testResultsView(lang,assetPrefix){
 const t=(en,ko)=>lang==='ko'?ko:en;
 const base=assetPrefix+'results/';
 const loc=v=>v?.[lang]||v?.en||v;
 return `<section data-test-results data-results-base="${base}" style="grid-column:1/-1;min-width:0;width:100%" aria-label="${t('Interactive test results','시험 결과 탐색')}">
 <div data-results-fallback><h3>${t('Published readings','공개 측정값')}</h3><div style="overflow:auto"><table><thead><tr><th>${t('Date','날짜')}</th><th>${t('Peak thrust','최대 추력')}</th><th>${t('Total impulse','총 임펄스')}</th><th>${t('Burn duration','연소 시간')}</th><th>${t('Peak pressure','최대 압력')}</th><th>${t('Source data','원자료')}</th></tr></thead><tbody>${resultCatalog.tests.map(test=>`<tr><th scope="row">${test.date}</th>${['maxThrustN','totalImpulseNs','burnTimeMs','maxPressureBar'].map(key=>`<td>${escape(test.metrics[key].display)}</td>`).join('')}<td><a href="${base}upstream/${encodeURI(test.links.pipelineData)}" download>TSV</a> · <a href="https://postech-psi.github.io/test-results/${test.links.page}">${t('Record','기록')}</a></td></tr>`).join('')}</tbody></table></div>
 <p>${t('Reported measurements depend on each test’s conditions and processing. Compare the raw, corrected and filtered signals below; filtering and calibration are not recalculated by this website.','보고된 측정값은 시험 조건과 처리 방법에 따라 달라집니다. 아래에서 원시·보정·필터 신호를 비교할 수 있으며 웹사이트는 필터링이나 교정을 다시 계산하지 않습니다.')}</p></div>
 <div data-results-status role="status" aria-live="polite"></div><button type="button" data-results-retry hidden>${t('Retry charts','그래프 다시 불러오기')}</button>
 <div data-results-comparison></div>
 <label style="display:block;margin-top:32px" for="results-trial">${t('Detailed signals and conditions','시험별 신호와 조건')}</label><select id="results-trial" data-results-select>${resultCatalog.tests.map(test=>`<option value="${test.id}">${test.date} · ${escape(loc(test.title))}</option>`).join('')}</select>
 <div data-results-detail></div>
 <p><a href="https://postech-psi.github.io/test-results/">${t('Independent test-results portal','독립 시험 결과 포털')}</a> · <a href="https://github.com/postech-psi/test-results/tree/11df0dc525da7113dd504e363662f59498e2a587">${t('Pinned implementation and source','고정된 구현 버전과 소스')}</a></p></section>`;
}
