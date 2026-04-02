const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const filePath = 'file:///' + path.resolve('BJJ.Score.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  // Log panel with linked penalty example
  await page.evaluate(() => {
    document.querySelectorAll('.scr').forEach(el => el.classList.remove('on'));
    document.getElementById('bA').classList.add('on');
    MD = 'A'; TP = 'A';

    document.getElementById('nA1').textContent = '김민수';
    document.getElementById('nA2').textContent = '박준혁';

    S[1] = { p2:0, p3:0, p4:0, t:8, pe:1, ad:2, bonus:0 };
    S[2] = { p2:0, p3:0, p4:0, t:4, pe:2, ad:2, bonus:0 };
    RM = 120; TT = 300;

    LOG = [
      { time:'0:32', elapsed:32, player:'김민수', pNum:1, desc:'+2' },
      { time:'1:05', elapsed:65, player:'박준혁', pNum:2, desc:'+2' },
      { time:'1:28', elapsed:88, player:'김민수', pNum:1, desc:'A +1' },
      { time:'1:55', elapsed:115, player:'박준혁', pNum:2, desc:'+2' },
      { time:'2:10', elapsed:130, player:'김민수', pNum:1, desc:'+2' },
      // P2 gets 2nd penalty -> P1 gets A+1 (linked)
      { time:'2:30', elapsed:150, player:'박준혁', pNum:2, desc:'P +1' },
      { time:'2:30', elapsed:150, player:'김민수', pNum:1, desc:'A +1', linked:true, fromP:2 },
      { time:'2:48', elapsed:168, player:'김민수', pNum:1, desc:'A +1' },
      { time:'3:15', elapsed:195, player:'김민수', pNum:1, desc:'+2' },
      // P2 gets 3rd penalty -> P1 gets +2 (linked)
      { time:'3:40', elapsed:220, player:'박준혁', pNum:2, desc:'P +1' },
      { time:'3:40', elapsed:220, player:'김민수', pNum:1, desc:'+2', linked:true, fromP:2 },
      { time:'4:02', elapsed:242, player:'김민수', pNum:1, desc:'P +1' },
    ];

    refAll();
    openLog();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join('screenshot', '09_log.jpg'), type: 'jpeg', quality: 90 });
  console.log('Saved: 09_log.jpg');

  await browser.close();
  console.log('Done!');
})();
