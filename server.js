const express = require('express')
const package = require('./package.json')
const magnifier = require('./magnifier')
const app = express()
const homepath = package.homepath || '/api'
const homeport = package.homeport || '2525'

magnifier.init()

app.get(homepath, function (req, res) {
  res.json({message: 'See https://github.com/sjfrhafe/song_search_api#readme for documentation'})
})

app.get(homepath + '/:query', function (req, res) {
  let query = req.params.query
  magnifier.find(query)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500))
})

app.listen(homeport)
