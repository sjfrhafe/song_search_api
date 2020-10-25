const express = require('express')
const magnifier = require('./magnifier')
const app = express()

const ssaConfigDefault = {homepath: '', homeport: '2525'}
var ssaConfig = {}
try{
  const ssaConfigFile = require('./ssa.config.json')
  ssaConfig.homepath = (ssaConfigFile.homepath || ssaConfigDefault.homepath) + '/'
  ssaConfig.homeport = ssaConfigFile.homeport || ssaConfigDefault.homeport
}catch(e){
  ssaConfig.homepath = ssaConfigDefault.homepath + '/'
  ssaConfig.homeport = ssaConfigDefault.homeport
}

magnifier.init()

app.get(ssaConfig.homepath, function (req, res) {
  res.json({message: 'See https://github.com/sjfrhafe/song_search_api#readme for documentation'})
})

app.get(ssaConfig.homepath + ':query', function (req, res) {
  let query = req.params.query
  magnifier.find(query)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500))
})

app.listen(ssaConfig.homeport)
