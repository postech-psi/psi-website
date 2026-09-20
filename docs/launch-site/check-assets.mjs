import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {render} from './templates.mjs';

// A returning visitor must request the version matching the generated document.
for (const language of ['en','ko']) for (const page of ['index','avionics']) {
  const html=render(page,language);
  for (const asset of ['site.css','program-pages.css','site.js',...(page==='avionics'?['telemetry.mjs']:[])]) {
    const digest=createHash('sha256').update(readFileSync(new URL(asset,import.meta.url))).digest('hex').slice(0,12);
    assert.ok(html.includes(asset+'?v='+digest),asset+' must use its current content fingerprint');
  }
}
console.log('PASS: generated documents request content-versioned styles and scripts in both languages.');
