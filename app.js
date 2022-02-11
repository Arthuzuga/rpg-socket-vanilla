const express = require('express')
const app = express()
const path = require('path')

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile('/views/index.html')
})

app.get('/player', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/player.html'))
})

app.get('/dm', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/gameMaster.html'))
})

app.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/gameRoom.html'))
})

app.listen(5000)

console.log(`IT'S ALIVE`);