const express = require('express')
const app = express()
const path = require('path')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

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
      players: [
        { name: 'joao', life: 100, mana: 100 },
        { name: 'bruno', life: 100, mana: 100 },
        { name: 'douglas', life: 100, mana: 100 },
      ],
    }
  })
})

server.listen(process.env.PORT || 5000, () => {
  console.log(`IT'S ALIVE`);
})
