const puppeteer = require('puppeteer');

class Magnifier{
  init = async () => {
    this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false});
  }

  find = async (query) => {
    return new Promise(async (resolve, reject) => {
      try{
        let page

        let timeout = setTimeout(() => {
          if(page) {
            reject('timeout')
            page.close()
          }
        }, 4000)

        page = await this.browser.newPage()

        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (request.resourceType() === 'image') request.abort();
          else request.continue();
        });

        await page.goto('https://www.youtube.com/results?search_query=' + query)
        await page.waitForSelector('#video-title')

        const videoData = await page.evaluate(() => {
          return{
            link: document.getElementById('video-title').href,
            title: document.getElementById('video-title').title
          }
        })

        clearTimeout(timeout)

        page.close()

        resolve(videoData)
      }catch(e){
        reject(e)
      }
    })
  }
}

module.exports = new Magnifier();
