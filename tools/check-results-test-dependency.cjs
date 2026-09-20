// Resolve exactly as the parity suite does, independently of developer home paths.
const assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const path = require('node:path');
const suiteRequire = createRequire(path.resolve(__dirname, '../docs/launch-site/check-test-results.cjs'));
assert.doesNotThrow(() => suiteRequire.resolve('playwright'), 'results suite resolves its declared Playwright dependency');
const declared = require('../package.json').devDependencies.playwright;
assert.equal(suiteRequire('playwright/package.json').version, declared);
assert.equal(typeof suiteRequire('playwright').chromium.launch, 'function');
console.log('PASS results suite resolves pinned Playwright through standard Node module resolution');
