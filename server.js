const express = require('express')
const search = require('./search')
const searchFast = require('./search-fast')
const path = require('path')
const app = express()

const ssaConfigDefault = {homepath: '', homeport: '2525', testing: false}
var ssaConfig = {}
try{
  const ssaConfigFile = require('./ssa.config.json')
  ssaConfig.homepath = (ssaConfigFile.homepath || ssaConfigDefault.homepath) + '/'
  ssaConfig.homeport = ssaConfigFile.homeport || ssaConfigDefault.homeport
  ssaConfig.testing = ssaConfigFile.testing || ssaConfigDefault.testing
}catch(e){
  ssaConfig.homepath = ssaConfigDefault.homepath + '/'
  ssaConfig.homeport = ssaConfigDefault.homeport
  ssaConfig.testing = ssaConfigDefault.testing
}

search.init()

app.get(ssaConfig.homepath, (req, res) => {
  if(ssaConfig.testing){
    res.sendFile(path.join(__dirname, 'test.html'))
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
