const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

module.exports = async function (config) {
    const { url } = config;

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-infobars', '--disable-logging', '--disable-login-animations', '--disable-notifications',
        '--disable-gpu',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        "--window-position=-5000,0", '--lang=ko_KR', ],
        headless: false,
    });

    const target = await browser.newPage();

    await target.goto(url);
    const pageBody = await target.evaluate(() => document.querySelector('*').outerHTML);

    if (pageBody.includes('cf-im-under-attack')) {
        const clearance = new Promise((resolve) => {
            target.on('request', async (request) => {
                const { cookies } = await target._client.send('Network.getAllCookies');
                let cf_clearance = cookies.findIndex((c) => c.name === 'cf_clearance');
                if (cf_clearance > -1) {
                    cf_clearance = cookies[cf_clearance];
                    resolve(cookies);
                }
            });
        });

        const taskCheck = new Promise(resolve => {
            setTimeout(() => resolve(true), 10000);
        })

        let result = await Promise.race([clearance, taskCheck]);
        if(result && result.findIndex((c) => c.name === 'cf_clearance')){
            result.useragent = await browser.userAgent();
            await target.close();
            await browser.close();
            return result;
        }
        return false;
    }
    return false;
};