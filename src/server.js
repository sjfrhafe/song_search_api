import express from 'express'
import search from './strategies/search.js'
import searchFast from './strategies/search-fast.js' 
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

var ssaConfig = {
  homepath: (process.env.HOMEPATH || '') + '/', 
  homeport: process.env.HOMEPORT || '2525', 
  testing: process.env.TESTING == undefined ? true : (process.env.TESTING?.toLowerCase() === 'true')
}

search.init()

app.get(ssaConfig.homepath, (req, res) => {
  if(ssaConfig.testing){
    res.sendFile(path.join(__dirname, 'public', 'test.html'))
  }else{
    res.sendStatus(400)
  }
})

app.get(ssaConfig.homepath + 'search/:query', function (req, res) {
  let query = req.params.query
  search.find(query)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500))
})

app.get(ssaConfig.homepath + 'search-fast/:query', function (req, res) {
  let query = req.params.query
  searchFast.find(query)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500))
})

app.listen(ssaConfig.homeport)
