import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const repository=fileURLToPath(new URL('../',import.meta.url));
const sourcePath='docs/launch-site/assets/supporter-sources.md';
const releasePath='assets/supporter-sources.md';
const digest=value=>createHash('sha256').update(value).digest('hex');

const source=await readFile(new URL(`../${sourcePath}`,import.meta.url));
const exported=await readFile(new URL(`../${releasePath}`,import.meta.url));
const manifest=JSON.parse(await readFile(new URL('../release.json',import.meta.url),'utf8'));
const releaseEntry=manifest.files.find(file=>file.path===releasePath);

assert.ok(releaseEntry,`Release manifest includes ${releasePath}`);
assert.equal(source.length,releaseEntry.bytes,`${sourcePath} byte count matches release manifest`);
assert.equal(digest(source),releaseEntry.sha256,`${sourcePath} digest matches release manifest`);
assert.deepEqual(exported,source,`${releasePath} matches its source byte-for-byte`);

for(const autocrlf of ['true','false']) for(const path of [sourcePath,releasePath]) {
  const checkout=execFileSync('git',['-c',`core.autocrlf=${autocrlf}`,'cat-file','--filters',`--path=${path}`,`HEAD:${path}`],{
    cwd:repository,
    encoding:null,
  });
  assert.equal(checkout.length,releaseEntry.bytes,`${path} checkout bytes with core.autocrlf=${autocrlf}`);
  assert.equal(digest(checkout),releaseEntry.sha256,`${path} checkout digest with core.autocrlf=${autocrlf}`);
}

console.log(JSON.stringify({
  files:[sourcePath,releasePath],
  autocrlf:['true','false'],
  bytes:releaseEntry.bytes,
  sha256:releaseEntry.sha256,
  checks:'passed',
},null,2));
