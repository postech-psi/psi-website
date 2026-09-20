const assert = require('node:assert/strict');

// Drive explicit preferences through the visible control, not injected UI state.
async function setTheme(page, choice) {
  if (choice === 'system') {
    // Exercise compatibility for visitors with an explicitly saved old system preference.
    await page.evaluate(() => localStorage.setItem('psi-theme','system'));
    await page.reload();
    return;
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    const current = await page.locator('html').getAttribute('data-theme-choice');
    if (current === choice) break;
    await page.locator('[data-theme-toggle]').click();
  }
  assert.equal(await page.locator('html').getAttribute('data-theme'), choice);
}

module.exports = {setTheme};
