const socket = io("http://localhost:5000");

class Player {
  constructor({life, mana, name}) {
    this.life = life
    this.mana = mana
    this.name = name
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
    playerImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvrgFiA297S1EgUWGwJLWqTg0-P-mMSGosrw&usqp=CAU"
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
    const gallery = document.getElementById('gallery')

    const form = document.createElement('form')
    form.id = 'form'
    const lifeField = document.createElement('div')
    lifeField.className = 'field'
    const lifeLabel = document.createElement('label')
    lifeLabel.htmlFor = 'life'
    lifeLabel.textContent = 'HP'

    const lifeInput = document.createElement('input')
    lifeInput.name = 'life'
    lifeInput.id = `${this.name}-life`

    const manaField = document.createElement('div')
    manaField.className = 'field'
    const manaLabel = document.createElement('label')
    manaLabel.htmlFor = 'mana'
    manaLabel.textContent = 'Spell Slots'

    const manaInput = document.createElement('input')
    manaInput.name = 'mana'
    manaInput.id = `${this.name}-mana`

    const button = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Salvar'

    manaField.appendChild(manaLabel)
    manaField.appendChild(manaInput)

    lifeField.appendChild(lifeLabel)
    lifeField.appendChild(lifeInput)

    form.appendChild(lifeField)
    form.appendChild(manaField)
    form.appendChild(button)

    gallery.appendChild(form)
  }
}