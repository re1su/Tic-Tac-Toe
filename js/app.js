const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('#status-text')
const restartBtn = document.querySelector('#restart-button')
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
let options = ['', '', '', '', '', '', '', '', '']
let currPlayer = 'X'
let isRunning = false

initializeGame()

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked))
  restartBtn.addEventListener('click', restartGame)
  statusText.textContent = `${currPlayer}'s turn`
  isRunning = true
}

function cellClicked() {
  const cell = this.getAttribute('cellindex')

  if (options[cell] !== '' || !isRunning) {
    return
  }

  updateCell(this, cell)
  checkWinner()
}

function updateCell(cell, index) {
  options[index] = currPlayer
  cell.textContent = currPlayer
}

function changePlayer() {
  currPlayer = (currPlayer === 'X') ? 'O' : 'X'
  statusText.textContent = `${currPlayer}'s turn`
}

function checkWinner() {
  let roundWon = false

  for(let i = 0; i < winConditions.length; i++) {
    const conditon = winConditions[i]
    const cellA = options[conditon[0]]
    const cellB = options[conditon[1]]
    const cellC = options[conditon[2]]

    if (cellA === '' || cellB === '' || cellC === '' ) {
      continue
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    statusText.textContent = `${currPlayer}' wins!`
    isRunning = false
  } else if (!options.includes('')) {
    statusText.textContent = `Draw`
    isRunning = false
  } else {
    changePlayer()
  }
}

function restartGame() {
  currPlayer = 'X'
  statusText.textContent = `${currPlayer}'s turn`
  options = ['', '', '', '', '', '', '', '', '']
  cells.forEach(cell => cell.textContent = '')
  isRunning = true
}