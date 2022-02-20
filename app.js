const express = require('express')
const app = express()
const path = require('path')
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const mockPlayers = require('./mockPlayers.js')

require('dotenv').config()

app.set("view options", {layout: false})
app.use(express.static(__dirname + '/views'))

io.on('connection', (socket) => {
  socket.on('life', ({ life, name }) => {
    io.emit('life', {
      currentHP: life,
      name,
    });
  })

  socket.on('mana', ({ mana, name }) => {
    io.emit('mana', {
      currentMana: mana,
      name,
    });
  });

  socket.on('secret-challenge-request', () => {
    io.emit('secret-request')
  })

  socket.on('secret-challenge-response', ({ value }) => {
    io.emit('secret-response', {
      value,
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

app.get('/', function (req, res) {
  res.sendFile('/views/index.html')
})

app.get('/player-:name', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/player.html'))
})

app.get('/dm', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/gameMaster.html'))
})

app.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/gameRoom.html'))
})

app.get('/game-info', function (req, res) {
  return res.status(200).json({
    data: {
      players: mockPlayers,
    }
  })
})

app.get('/player-info/:name', function (req, res) {
  return res.status(200).json({
    data: {
      player: mockPlayers.filter(({ name }) => name.toLowerCase() === req.params.name),
    }
  })
})

server.listen(process.env.PORT || 5000, () => {
  console.log(`IT'S ALIVE`);
})
