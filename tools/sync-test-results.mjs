// Immutable upstream snapshot and reproducible integration output.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {adaptController,adaptStyles,adaptCharts} from './test-results-adapter.mjs';
const root=new URL('../docs/launch-site/assets/results/',import.meta.url);
const revision='11df0dc525da7113dd504e363662f59498e2a587';
const origin=`https://raw.githubusercontent.com/postech-psi/test-results/${revision}/`;
const paths=['assets/charts.js','assets/site.js','assets/site.css','assets/vendor/echarts.min.js','assets/fonts/PretendardVariable.woff2','tests/index.json','tests/2026-04-03/files/26.04.03 data_pipeline_data.txt','tests/2026-04-08/files/TMS_4_pipeline_data.txt','tests/2026-05-28/files/TMS_9_pipeline_data.txt','tests/2026-07-16/files/tms_5_pipeline_data.txt'];
const entries=paths.map(path=>({path:'upstream/'+path,url:origin+path.split('/').map(encodeURIComponent).join('/')}));
entries.push({path:'licenses/ECharts-LICENSE.txt',url:'https://raw.githubusercontent.com/apache/echarts/5.5.1/LICENSE'},{path:'licenses/ECharts-NOTICE.txt',url:'https://raw.githubusercontent.com/apache/echarts/5.5.1/NOTICE'},{path:'licenses/Pretendard-LICENSE.txt',url:'https://raw.githubusercontent.com/orioncactus/pretendard/v1.3.9/LICENSE'});
const sha=b=>createHash('sha256').update(b).digest('hex');
const lockUrl=new URL('source-lock.json',root);
let lock;try{lock=JSON.parse(await readFile(lockUrl,'utf8'));}catch{}
if(process.argv.includes('--sync')){
 for(const entry of entries){const response=await fetch(entry.url);if(!response.ok)throw Error(`${response.status}: ${entry.url}`);const bytes=Buffer.from(await response.arrayBuffer());const previous=lock?.files.find(f=>f.path===entry.path);if(previous&&sha(bytes)!==previous.sha256)throw Error('Upstream digest changed: '+entry.path);await mkdir(dirname(fileURLToPath(new URL(entry.path,root))),{recursive:true});await writeFile(new URL(entry.path,root),bytes);}
}
for(const entry of entries){const bytes=await readFile(new URL(entry.path,root));entry.sha256=sha(bytes);entry.bytes=bytes.length;if(lock&&lock.files.find(f=>f.path===entry.path)?.sha256!==entry.sha256)throw Error('Snapshot mismatch: '+entry.path);}
const source=async p=>readFile(new URL('upstream/assets/'+p,root),'utf8');
const generated={'controller.mjs':adaptController(await source('site.js')),'results.css':adaptStyles(await source('site.css')),'charts.js':adaptCharts(await source('charts.js'))};
for(const [path,content] of Object.entries(generated)){
 if(process.argv.includes('--check')){if(await readFile(new URL(path,root),'utf8')!==content)throw Error('Stale generated results asset: '+path);}
 else await writeFile(new URL(path,root),content);
}
const next={repository:'https://github.com/postech-psi/test-results',revision,patches:'tools/test-results-adapter.mjs (scoping, lifecycle, missing-cell and tooltip fixes; original chart geometry preserved)',files:entries,generated:Object.entries(generated).map(([path,content])=>({path,sha256:sha(content)})),publicFiles:[...entries.map(e=>e.path),...Object.keys(generated),'mount.mjs','loader.js','shell.css','source-lock.json']};
if(process.argv.includes('--check')){if(JSON.stringify(lock)!==JSON.stringify(next))throw Error('Stale source lock');}
else await writeFile(lockUrl,JSON.stringify(next,null,2)+'\n');
console.log('Verified pinned results snapshot and deterministic adaptations');
