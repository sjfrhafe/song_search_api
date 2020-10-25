const puppeteer = require('puppeteer');

class Search{
  init = async () => {
    this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
  }

  find = async (query) => {
    return new Promise(async (resolve, reject) => {
      try{
        let page = await this.browser.newPage()

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

        page.close()

        resolve(videoData)
      }catch(e){
        reject(e)
      }
    })
  }
}

module.exports = new Search();
