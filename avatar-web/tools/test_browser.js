const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('[BROWSER]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[PAGE_ERROR]', err.message));

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Clicking login button (#loginBtn)...');
  await page.click('#loginBtn');
  
  await new Promise(r => setTimeout(r, 4000));
  
  const status = await page.evaluate(() => document.getElementById('login-status')?.textContent);
  console.log('Current login-status:', status);
  
  await page.screenshot({ path: 'C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/browser_test_result.png' });
  console.log('Screenshot saved to browser_test_result.png');
  
  await browser.close();
})().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
