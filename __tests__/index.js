const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {exec} = require("child_process");

puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false, product: 'chrome' }).then(async browser => {
    let count = 0;
    let page = await browser.newPage();
    while (true) {
        let time = Math.floor(Date.now() / 1000);
        try {
            page = await browser.newPage()
            await page.setViewport({ width: 800, height: 600 })
            await page.setDefaultTimeout(60000);

            await page.goto('https://otv.verwalt-berlin.de/ams/TerminBuchen');
            await page.waitForXPath('//a[text()="Termin buchen"]').then(e => e.click());
            await page.waitForNavigation();
            await page.waitForSelector('.loading', {visible: true});
            await page.waitForSelector('.loading', {hidden: true});
            await page.click('#xi-cb-1');
            await page.click('#applicationForm\\:managedForm\\:proceed');
            await page.waitForNavigation();
            await page.waitForSelector('.loading', {visible: true});
            await page.waitForSelector('.loading', {hidden: true});

            await page.waitForTimeout(3000);
            await page.select('#xi-sel-400', '160');

            await page.waitForTimeout(3000);
            await page.select('#xi-sel-422', '2');

            await page.waitForTimeout(3000);
            await page.select('#xi-sel-427', '1');

            await page.waitForTimeout(3000);
            await page.select('#xi-sel-428', '160-0');

            await page.waitForTimeout(3000);
            await page.waitForXPath('//p[contains(text(), "Aufenthaltstitel - beantragen")]').then(e => e.click());
            await page.waitForXPath('//p[contains(text(), "Erwerbstätigkeit")]').then(e => e.click());

            await page.waitForTimeout(3000);
            await page.waitForSelector('#SERVICEWAHL_DE160-0-1-1-324659')
            await page.click('#SERVICEWAHL_DE160-0-1-1-324659')
            await page.waitForSelector('.loading', {visible: true});
            await page.waitForSelector('.loading', {hidden: true});
            await page.waitForSelector('.loading', {hidden: true});

            await page.waitForTimeout(3000);
            count = count + 1;
            await page.waitForSelector('#applicationForm\\:managedForm\\:proceed');
            await page.click('#applicationForm\\:managedForm\\:proceed');

            await page.waitForSelector('.loading', {visible: true});
            await page.waitForSelector('.loading', {hidden: true});
            await page.waitForSelector('.loading', {hidden: true});


            //await expect(page).toMatchElement('#messagesBox > ul > li.errorMessage');
            //await page.waitForSelector('.errorMessage', {timeout:5000})
            await page.waitForXPath("//li[@class='antcl_active'][span='Servicewahl']", {timeout: 5000})
            //console.log("selector with error message found")
            await page.waitForTimeout(3000);

            //await page.click('#applicationForm\\:managedForm\\:proceed');
            //await page.waitForTimeout(5000);
            await page.waitForSelector('#applicationForm\\:managedForm\\:proceed');


            while (Math.floor(Date.now() / 1000) - time < 60 * 25) {
                count = count + 1;
                await page.click('#applicationForm\\:managedForm\\:proceed');

                await page.waitForSelector('.loading', {visible: true});
                await page.waitForSelector('.loading', {hidden: true});
                await page.waitForSelector('.loading', {hidden: true});
                await page.waitForTimeout(3000);

                //await expect(page).toMatchElement('#messagesBox > ul > li.errorMessage');
                await page.waitForXPath("//li[@class='antcl_active'][span='Servicewahl']", {timeout: 15000})
                await page.waitForSelector('#applicationForm\\:managedForm\\:proceed');
                //console.log("selector with error message found")
                await page.waitForTimeout(1000);
                console.log("try " + count + " failed");
            }
            await page.waitForTimeout(3000)

            await page.close();

        } catch (e) {
            let i = 0;
            console.log("caught exception "+e + " on count " + count);
            while (i < 3) {
                console.log('\x07');
                i += 1;
            }
            //let path1 = path.join(__dirname, 'e2e', 'screenshots');
            //await fs.promises.mkdir(path1, {recursive: true});
            //await page.screenshot({path: `${path1}/screenshot.png`});
            let j = 0;
            while (j < 20) {
                exec('beep');
                j = j+1;
            }
            await page.waitForTimeout(1000 * 60 * 5);
        }
    }
})

/*describe('Check termins', () => {
    beforeAll( async () => {

        // Set a definite size for the page viewport so view is consistent across browsers
        await page.setViewport( {
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        } );
    } );

    it( 'should NOT have termins', async () => {



        }
    })
});*/
