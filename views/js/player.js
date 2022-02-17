const socket = io("http://localhost:5000");

class Player {
  constructor({ life, mana, name, image }) {
    this.life = life
    this.mana = mana
    this.name = name
    this.image = image
  }

  setLife() {
    const life = document.getElementById(`${this.name}-life`)
    if (life.value) {
      socket.emit('life', {
        life: life.value,
        name: this.name,
      })
    }
  }

  setMana() {
    const mana = document.getElementById(`${this.name}-mana`)
    if (mana.value) {
      socket.emit('mana', {
        mana: mana.value,
        name: this.name,
      })
    }
  }

  getLife() {
    const life = document.getElementById(`${this.name}-life`)
    socket.on('life', ({ currentHP, name }) => {
      if (name === this.name) {
        life.style.setProperty("--life-width",`${100*(currentHP/this.life)}%`)
      }
    })
  }

  getMana() {
    const mana = document.getElementById(`${this.name}-mana`)
    socket.on('mana', ({ currentMana, name }) => {
      if (name === this.name) {
        mana.style.setProperty("--mana-width",`${100*(currentMana/this.mana)}%`)
      }
    })
  }

  createHUD() {
    const gallery = document.getElementById('gallery')

    const player = document.createElement('div')
    player.className = 'player'
    player.id = this.name

    const playerContainer = document.createElement('div')
    playerContainer.className = 'player-container'

    const playerImage = document.createElement('img')
    playerImage.src = this.image
    playerImage.alt =  `${this.name} photo`
    playerImage.className = 'photo'

    const playerLife = document.createElement('div')
    playerLife.className = 'life'
    playerLife.id = `${this.name}-life` 
    const playerMana = document.createElement('div')
    playerMana.className = 'mana'
    playerMana.id = `${this.name}-mana` 

    playerContainer.appendChild(playerImage)
    playerContainer.appendChild(playerLife)
    playerContainer.appendChild(playerMana)

    const playerName = document.createElement('span')
    playerName.textContent = this.name

    player.appendChild(playerContainer)
    player.appendChild(playerName)

    gallery.appendChild(player)
  }

  createCharacterForm() {
    const lifeInput = document.querySelector('input[name=life]')
    lifeInput.id = `${this.name}-life`

    const manaInput = document.querySelector('input[name=mana]')
    manaInput.id = `${this.name}-mana`
  }
}