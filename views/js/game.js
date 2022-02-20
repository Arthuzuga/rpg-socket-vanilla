const getRollValue = () => {
  const value = Math.random() * 20;
  return Math.floor(value)
}
class Game {
  

  rollDice() {
    const rollDiceDiv = document.getElementById('dice')
        
    const diceResultValue = getRollValue();
    const diceResultDiv = document.getElementById('diceResult')
    
    if (!diceResultDiv) {
      const newDiceResult = document.createElement('span')
      newDiceResult.id = 'diceResult'
      newDiceResult.textContent = diceResultValue
      rollDiceDiv.appendChild(newDiceResult)
    } else {
      diceResultDiv.textContent = diceResultValue
    }
  }

  rollSecretDice() {
    const value = getRollValue()

    const footer = document.getElementById('secret-challenge')
    footer.style.setProperty('--animation-name', 'hideMessage')
    setTimeout(() => {
      footer.style.setProperty('--display-footer', 'none')
    }, 2100)

    return value;
  }
}