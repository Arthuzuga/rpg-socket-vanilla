class Game {
  
  rollDice() {
    const rollDiceDiv = document.getElementById('dice')
        
    const value = Math.random() * 20;
    const diceResult = document.getElementById('diceResult')
    
    if (!diceResult) {
      const newDiceResult = document.createElement('span')
      newDiceResult.id = 'diceResult'
      newDiceResult.textContent = Math.floor(value)
      rollDiceDiv.appendChild(newDiceResult)
    } else {
      diceResult.textContent = Math.floor(value)
    }
  }

}