const express = require('express')
const magnifier = require('./magnifier')
const path = require('path')
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

app.get(ssaConfig.homepath, (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'))
})

app.get(ssaConfig.homepath, function (req, res) {
  res.json({message: ''})
})

app.get(ssaConfig.homepath + 'search/:query', function (req, res) {
  let query = req.params.query
  magnifier.find(query)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500))
})

app.listen(ssaConfig.homeport)
