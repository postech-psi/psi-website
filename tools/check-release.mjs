import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {exportSite} from './export-launch-site.mjs';

const scratch=await mkdtemp(join(tmpdir(),'psi-release-check-'));
const destination=join(scratch,'psi-website');
const release=await exportSite(destination);
const names=release.files.map(file=>file.path);
assert.equal(names.filter(name=>/^(ko\/)?(?:index|projects|pslv|research|learning|about|news|join|gallery|avionics|tms)\.html$/.test(name)).length,22);
for(const name of ['site.css','site.js','telemetry.mjs','assets/onboard.mp4','assets/onboard-poster.webp','assets/archive-telemetry.json','assets/Pretendard.woff2','assets/Pretendard-LICENSE.txt','assets/rocket-detail.webp'])assert.ok(names.includes(name),'Required runtime asset '+name);
assert.ok(!names.some(name=>/docs\/|review\/|manifest|spring-community|Barlow|\.(pdf|pptx|cjs)$/i.test(name)),'Only the intended public subset is exported');
for(const name of ['postech','postech-me','matlab','ansys'])assert.ok(names.includes(`assets/supporter-${name}.png`),'Supporter logo exports: '+name);
assert.ok(names.includes('assets/supporter-sources.md'),'Public logo provenance exports');
assert.ok(!names.some(name=>/ansys\.zip|mathworks-white|matlab-icon|task4|extract-prose/.test(name)),'Unused artwork and editorial scratch stay private');
for(const [name,target] of [['team.html','about.html'],['events.html','news.html'],['contact.html','join.html']]) {
 const html=await readFile(join(destination,name),'utf8');
 assert.ok(html.includes('url='+target)&&html.includes('href="'+target+'"'),'Legacy address has a no-JS destination');
}
for(const file of release.files) {
 const content=await readFile(join(destination,file.path));
 assert.equal(createHash('sha256').update(content).digest('hex'),file.sha256,'Digest for '+file.path);
}
assert.deepEqual(await exportSite(destination),release,'Repeated export is deterministic');
const foreign=join(scratch,'foreign');
await mkdir(foreign);
await writeFile(join(foreign,'index.html'),'User-owned file');
await assert.rejects(exportSite(foreign),/unowned|modified/i,'Never overwrite an unrelated file');
assert.equal(await readFile(join(foreign,'index.html'),'utf8'),'User-owned file');
await writeFile(join(destination,'site.css'),'User modified the exported CSS');
await assert.rejects(exportSite(destination),/modified/i,'Never overwrite a modified owned output');
assert.equal(await readFile(join(destination,'site.css'),'utf8'),'User modified the exported CSS');
await writeFile(join(destination,'site.css'),await readFile(new URL('../docs/launch-site/site.css',import.meta.url)));
assert.deepEqual(await exportSite(destination),release);
await access(join(destination,'release.json'));
console.log(JSON.stringify({files:names.length,revision:release.revision,stagingRoot:scratch,siteDirectory:destination,checks:'passed'},null,2));
