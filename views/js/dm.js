class DM {
  secretChallenge() {
    socket.emit('secret-challenge-request')
  }

  getSecretChallengeResponse() {
    socket.on('secret-response', ({ value })  => {
      const responseSpan = document.getElementById('secret-response')
      responseSpan.className = 'secret-response'

      let colorResponse = 'red'
      let textResponse = 'falhou'

      if (value >= 12){
        colorResponse = 'green'
        textResponse = 'passou'
      }

      responseSpan.style.setProperty('--background-response', colorResponse)
      responseSpan.textContent = textResponse

    })
  }
}