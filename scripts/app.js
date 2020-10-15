const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const highScoreBtn = document.querySelector('#high-score')
const scoreDiv = document.querySelector('#score')
const timeDiv = document.querySelector('#timer')
const minesDiv = document.querySelector('#mines')
const gameOptions = document.querySelector('.switches')
const gameDetails = document.querySelector('.game-details')
const scoreBoard = document.querySelector('.score-board')
const sushiBoard = document.querySelector('.sushi-board')
const winners = document.querySelector('.winners')
let highScores = []
let mineCounter = 0
let intervalTimer = 0
let tick = 0
let finalScore = 0
clearInterval(intervalTimer)

scoreDiv.innerHTML = 0
timeDiv.innerHTML = tick
minesDiv.innerHTML = mineCounter
gameDetails.style.display = 'none'
scoreBoard.style.display = 'none'

let score = 0
const grid = document.querySelector('.grid')
let width = null
let cellArray = []
let rngArray = []
let gameOn = false
let gameDifficulty = ''

// ! This function contains the game
function startGame() {
  // ! This creates a square grid of cells
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    if (width === 8) {
      div.classList.add('game-small')
    } else if (width === 12) {
      div.classList.add('game-medium')
    } else {
      div.classList.add('game-large')
    }
    div.id = i
    grid.appendChild(div)
    cellArray.push(div)
  }

  // ! This assigns random backgrounds 
  for (let i = 0; i < cellArray.length; i++) {
    const rng = Math.floor(Math.random() * 8)
    const randomBg = `iso-${rng}`
    cellArray[i].classList.add(randomBg)
  }

  // ! This makes an array of unique random numbers
  for (let i = 0; i < (cellArray.length / gameDifficulty) + 1; i++) {
    const rng = Math.floor(Math.random() * cellArray.length)
    if (rngArray.includes(rng)) {
      i--
    } else {
      rngArray.push(rng)
    }
    mineCounter = rngArray.length
    minesDiv.innerHTML = mineCounter
  }

  // ! This adds bombs to the array
  for (let i = 0; i < rngArray.length; i++) {
    cellArray[rngArray[i]].classList.add('bomb')
  }

  // ! This hides Game Options and shows Game Details
  gameOptions.style.display = 'none'
  gameDetails.style.display = 'block'


  // ! This listens to each cell for a click
  cellArray.forEach(cell => {
    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      if (!cell.classList.contains('safe')) {
        if (cell.classList.contains('flag')) {
          mineCounter += 1
          cell.classList.remove('flag')
        } else {
          cell.classList.add('flag')
          mineCounter -= 1
        }
        minesDiv.innerHTML = mineCounter
      }
    })

    cell.addEventListener('click', () => {

      function mineCheck(cell) {

        // ! DRY adjacent checkers 
        const idLeft = Number(cell.id) - 1
        const idTopLeft = Number(cell.id) - width - 1
        const idTop = Number(cell.id) - width
        const idTopRight = Number(cell.id) - width + 1
        const idRight = Number(cell.id) + 1
        const idBottomRight = Number(cell.id) + width + 1
        const idBottom = Number(cell.id) + width
        const idBottomLeft = Number(cell.id) + width - 1

        // ! This grabs adjacent cells
        const cellTop = document.getElementById(idTop)
        const cellTopLeft = document.getElementById(idTopLeft)
        const cellLeft = document.getElementById(idLeft)
        const cellBottomLeft = document.getElementById(idBottomLeft)
        const cellBottom = document.getElementById(idBottom)
        const cellBottomRight = document.getElementById(idBottomRight)
        const cellRight = document.getElementById(idRight)
        const cellTopRight = document.getElementById(idTopRight)

        // ! DRY boundry checkers
        const boundTopLeft = 0
        const boundTopRight = width - 1
        const boundBottomRight = (width ** 2) - 1
        const boundBottomLeft = width ** 2 - width

        let bombCount = null

        // ? - 1, Check Where In Grid - 2, Check Valid Cells - 3, Add Bomb Count OR Recurse To Local Cells
        cell.style.backgroundImage = 'none'
        cell.style.backgroundColor = '#dbdbdb'
        if (!cell.classList.contains('safe')) {
          score += 10
        }
        cell.classList.add('safe')
        scoreDiv.innerHTML = score
        cell.classList.remove('flag')

        // ! This Checks For A Game Win
        if (score === (cellArray.length - rngArray.length) * 10) {
          cell.style.borderColor = 'darkgoldenrod'
          cell.style.backgroundColor = 'gold'
          cell.innerHTML = ''
          if (tick < 60) {
            score = score * 2
          } else if (tick < 120) {
            score = score * 1.5
          } 

          if (gameDifficulty === 3.5){
            finalScore = score * 2
          } else if (gameDifficulty === 4.5){
            finalScore = score * 1.5
          } else {
            finalScore = score
          }
           
          setTimeout(function () {
            alert(`Congradulatoins! You ate all the sushi. \n Your final score is ${finalScore}!`)
            if (highScores.length < 3 || finalScore > Number(highScores[2].score)) {
              highScoreInput()
            }
            gameEnd()
          }, 500)

        }

        // ! This Is The Recursive Algorithm  
        if (Number(cell.id) === boundTopLeft) {
          right(); bottomRight(); bottom()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
            if (!cellBottomRight.classList.contains('safe')) { mineCheck(cellBottomRight) }
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
          }

        } else if (Number(cell.id) === boundTopRight) {
          bottom(); bottomLeft(); left()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
            if (!cellBottomLeft.classList.contains('safe')) { mineCheck(cellBottomLeft) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
          }

        } else if (Number(cell.id) === boundBottomLeft) {
          right(); topRight(); top()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
            if (!cellTopRight.classList.contains('safe')) { mineCheck(cellTopRight) }
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
          }

        } else if (Number(cell.id) === boundBottomRight) {
          top(); topLeft(); left()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
            if (!cellTopLeft.classList.contains('safe')) { mineCheck(cellTopLeft) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
          }

        } else if (Number(cell.id) < width) {
          right(); bottomRight(); bottom(); bottomLeft(); left()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
            if (!cellBottomRight.classList.contains('safe')) { mineCheck(cellBottomRight) }
            if (!cellBottomLeft.classList.contains('safe')) { mineCheck(cellBottomLeft) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
          }

        } else if (Number(cell.id) % width === width - 1) {
          top(); bottom(); bottomLeft(); left(); topLeft()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
            if (!cellBottomLeft.classList.contains('safe')) { mineCheck(cellBottomLeft) }
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
            if (!cellTopLeft.classList.contains('safe')) { mineCheck(cellTopLeft) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
          }

        } else if (Number(cell.id) > (width ** 2) - width - 1) {
          right(); topRight(); top(); topLeft(); left()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellTopRight.classList.contains('safe')) { mineCheck(cellTopRight) }
            if (!cellTopLeft.classList.contains('safe')) { mineCheck(cellTopLeft) }
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
          }

        } else if (Number(cell.id) % width === 0) {
          top(); topRight(); right(); bottomRight(); bottom()
          if (bombCount !== null) {
            cell.innerHTML = bombCount
          } else {
            if (!cellBottomRight.classList.contains('safe')) { mineCheck(cellBottomRight) }
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
            if (!cellTopRight.classList.contains('safe')) { mineCheck(cellTopRight) }
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
          }

        } else {
          topLeft(); top(); topRight(); right(); bottomRight(); bottom(); bottomLeft(); left()
          if (bombCount !== null) {
            cell.innerHTML = bombCount

          } else {
            if (!cellTop.classList.contains('safe')) { mineCheck(cellTop) }
            if (!cellTopLeft.classList.contains('safe')) { mineCheck(cellTopLeft) }
            if (!cellLeft.classList.contains('safe')) { mineCheck(cellLeft) }
            if (!cellBottomLeft.classList.contains('safe')) { mineCheck(cellBottomLeft) }
            if (!cellBottom.classList.contains('safe')) { mineCheck(cellBottom) }
            if (!cellBottomRight.classList.contains('safe')) { mineCheck(cellBottomRight) }
            if (!cellRight.classList.contains('safe')) { mineCheck(cellRight) }
            if (!cellTopRight.classList.contains('safe')) { mineCheck(cellTopRight) }
          }
        }

        // ! This Checks Adjacent Cells For Mines ! Adds To Mine Count ! 
        function topLeft() {
          if (cellTopLeft.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function top() {
          if (cellTop.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function topRight() {
          if (cellTopRight.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function right() {
          if (cellRight.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottomRight() {
          if (cellBottomRight.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottom() {
          if (cellBottom.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottomLeft() {
          if (cellBottomLeft.classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function left() {
          if (cellLeft.classList.contains('bomb')) {
            bombCount += 1
          }
        }
      }

      if (tick === 0) {
        intervalTimer = setInterval(() => {
          tick += 1
          timeDiv.innerHTML = tick
        }, 1000)
      }



      // ! This Checks The Cell You Click On !
      if (cell.classList.contains('flag')) {
        return
      } else if (cell.classList.contains('bomb')) {
        cell.classList.add('reveal')
        cell.style.borderColor = 'red'
        cellArray.forEach(e => {
          if (e.classList.contains('flag') && !e.classList.contains('bomb')) {
            e.classList.remove('flag')
            e.style.borderColor = 'black'
          }
          if (e.classList.contains('bomb')) {
            e.classList.add('reveal')
          }
        })
        setTimeout(function () {
          alert('Gome Over! You ate too much wasabi.')
          finalScore = score
          console.log(highScores.length)
          if (highScores.length < 3 || finalScore > Number(highScores[2].score)) {
            highScoreInput()
          }
          clearInterval(intervalTimer)
          gameEnd()
        }, 1000)

      } else {
        mineCheck(cell)
      }

    })

  })
}


// ! ** - Start - Reset - High Score - ** !

startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (gameOn === false) {
    const gameSize = document.querySelector('input[name="size"]:checked').id
    const gameSpice = document.querySelector('input[name="spice"]:checked').id
    // ? Game Parameters ?
    if (gameSize === 'small') {
      width = 8
    } else if (gameSize === 'medium') {
      width = 12
    } else {
      width = 20
    }
    if (gameSpice === 'easy') {
      gameDifficulty = 6
    } else if (gameSpice === 'normal') {
      gameDifficulty = 4.5
    } else {
      gameDifficulty = 3.5
    }

    startGame()
    gameOn = true
  }
})

resetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  gameEnd()
})

highScoreBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (scoreBoard.style.display === 'none') {
    sushiBoard.style.display = 'none'
    scoreBoard.style.display = 'block'
  } else {
    sushiBoard.style.display = 'block'
    scoreBoard.style.display = 'none'
  }

})


function gameEnd() {
  clearInterval(intervalTimer)
  if (gameOn === true) {
    width = null
    gameDifficulty = null
    rngArray = []
    cellArray = []
    gameOn = false
    grid.innerHTML = ''
    score = 0
    scoreDiv.innerHTML = 0
    minesDiv.innerHTML = 0
    gameOptions.style.display = 'block'
    gameDetails.style.display = 'none'
    tick = 0
    timeDiv.innerHTML = tick
    finalScore = 0
  }
}

// ! Local Storage High Scores!

if (localStorage) {
  highScores = JSON.parse(localStorage.getItem('scores')) || []
  orderAndAddScores()
}

function highScoreInput() {
  const newName = prompt('You Made The Scoreboard! Please enter your name -')
  const newScore = finalScore
  const player = { name: newName, score: newScore }
  highScores.push(player)
  if (localStorage) {
    localStorage.setItem('scores', JSON.stringify(highScores))
  }
  orderAndAddScores()
}

function orderAndAddScores() {

  const array = highScores
    .sort((playerA, playerB) => playerB.score - playerA.score)
    .map(player => {

      return `<ul>
        Ninja ${player.name} has 
        ${player.score} points.
      </ul>`
    })

  winners.innerHTML = array.join('')
}
