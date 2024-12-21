const { test, expect } = require('@playwright/test');

test('Navigate to One Player Mode', async ({ page }) => {
    await page.goto('https://mohanned-mahmoud.github.io/ultimate_tic_tac_toe/index.html');
    await page.click('text=1 Player');
    expect(await page.url()).toContain('page2%20one%20player.html');
});

test('Navigate to Two Players Mode', async ({ page }) => {
    await page.goto('https://mohanned-mahmoud.github.io/ultimate_tic_tac_toe/index.html');
    await page.click('text=2 Players');
    expect(await page.url()).toContain('page3%20two%20players.html');
});

test('Restart from One Player Mode', async ({ page }) => {
    await page.goto('https://mohanned-mahmoud.github.io/ultimate_tic_tac_toe/page2%20one%20player.html');
    await page.click('text=Restart');
    expect(await page.url()).toContain('index.html');
});

test('Restart from Two Players Mode', async ({ page }) => {
    await page.goto('https://mohanned-mahmoud.github.io/ultimate_tic_tac_toe/page3%20two%20players.html');
    await page.click('text=Restart');
    expect(await page.url()).toContain('index.html');
});
