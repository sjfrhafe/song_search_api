import fetch from 'node-fetch'

class SearchFast{
  process = (data) => {
    const regex = /"videoId":"(\S{11})/gm;
    let m = regex.exec(data)
    return m?m[1]:null
  }

  find = async (query) => 
    fetch('https://www.youtube.com/results?search_query=' + query)
      .then(data => data.text())
      .then(data => ({link: 'https://www.youtube.com/watch?v=' + this.process(data)}))
  
}

export default new SearchFast()
