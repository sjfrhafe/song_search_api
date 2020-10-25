const fetch = require('node-fetch')

class SearchFast{
  process = (data) => {
    const regex = /"videoId":"(\S{11})/gm;
    let m = regex.exec(data)
    return m?m[1]:null
  }

  find = async (query) => {
    return new Promise(async (resolve, reject) => {
      try{
        fetch('https://www.youtube.com/results?search_query=' + query)
        .then(data => data.text())
        .then(data => resolve({link: 'https://www.youtube.com/watch?v=' + this.process(data)}))
      }catch(e){
        reject(e)
      }
    })
  }
}

module.exports = new SearchFast();
