const { test, expect } = require('@playwright/test');

test('Navigate to One Player Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/page1.html');
    await page.click('text=1 Player');
    expect(await page.url()).toContain('page2 one player.html');
});

test('Navigate to Two Players Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/page1.html');
    await page.click('text=2 Players');
    expect(await page.url()).toContain('page3 two players.html');
});

test('Restart from One Player Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/page2 one player.html');
    await page.click('text=Restart');
    expect(await page.url()).toContain('page1.html');
});

test('Restart from Two Players Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/page3 two players.html');
    await page.click('text=Restart');
    expect(await page.url()).toContain('page1.html');
});
