const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const grid = document.querySelector('.grid')
const width = 20
let cellArray = []
let rngArray = []
let gameOn = false

// ! This function contains the game
function startGame() {
  // ! This creates a square grid of cells
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    div.id = i
    grid.appendChild(div)

    cellArray.push(div)
  }

  // ! This makes an array of unique random numbers
  for (let i = 0; i < (cellArray.length / 6); i++) {
    const rng = Math.floor(Math.random() * cellArray.length)
    if (rngArray.includes(rng)) {
      i--
    } else {
      rngArray.push(rng)
    }
  }

  // ! This adds bombs to the array
  for (let i = 0; i < rngArray.length; i++) {
    cellArray[rngArray[i]].classList.add('bomb')
  }

  // ! This listens to each cell for a click
  cellArray.forEach(cell => {
    cell.addEventListener('click', () => {


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


      // ! This checks for valid cells to check for mines

      function mineCheck(cell) {
        let bombCount = null
        // cell = document.getElementById(cell.id)
        cell.classList.add('safe')

        if (Number(cell.id) === boundTopLeft) {
          right(); bottomRight(); bottom()

        } else if (Number(cell.id) === boundTopRight) {
          bottom(); bottomLeft(); left()

        } else if (Number(cell.id) === boundBottomLeft) {
          right(); topRight(); top()

        } else if (Number(cell.id) === boundBottomRight) {
          top(); topLeft(); left()

        } else if (Number(cell.id) < width) {
          right(); bottomRight(); bottom(); bottomLeft(); left()

        } else if (Number(cell.id) % width === width - 1) {
          top(); bottom(); bottomLeft(); left(); topLeft()

        } else if (Number(cell.id) > (width ** 2) - width - 1) {
          right(); topRight(); top(); topLeft(); left()

        } else if (Number(cell.id) % width === 0) {
          top(); topRight(); right(); bottomRight(); bottom()

        } else {

          topLeft(); top(); topRight(); right(); bottomRight(); bottom(); bottomLeft(); left()

          if (bombCount !== null) {
            cell.classList.add('safe')
            cell.innerHTML = bombCount

          } else {

            if (!cellTop.classList.contains('noBombs') && !cellTop.classList.contains('safe')) {
              // cellTop.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellTop)

            }
            if (!cellTopLeft.classList.contains('noBombs') && !cellTopLeft.classList.contains('safe')) {
              // cellTopLeft.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellTopLeft)

            }
            if (!cellLeft.classList.contains('noBombs') && !cellLeft.classList.contains('safe')) {
              // cellLeft.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellLeft)

            }
            if (!cellBottomLeft.classList.contains('noBombs') && !cellBottomLeft.classList.contains('safe')) {
              // cellBottomLeft.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellBottomLeft)

            }
            if (!cellBottom.classList.contains('noBombs') && !cellBottom.classList.contains('safe')) {
              // cellBottom.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellBottom)

            }
            if (!cellBottomRight.classList.contains('noBombs') && !cellBottomRight.classList.contains('safe')) {
              // cellBottomRight.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellBottomRight)

            }
            if (!cellRight.classList.contains('noBombs') && !cellRight.classList.contains('safe')) {
              // cellRight.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellRight)

            }
            if (!cellTopRight.classList.contains('noBombs') && !cellTopRight.classList.contains('safe')) {
              // cellTopRight.classList.add('noBombs')
              // cell.classList.add('noBombs')
              mineCheck(cellTopRight)

            }
            cell.innerHTML = bombCount

          }

        }
        
        // ! This checks valid cells and adds to the mine count
        function topLeft() {
          if (cellArray[idTopLeft].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function top() {
          if (cellArray[idTop].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function topRight() {
          if (cellArray[idTopRight].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function right() {
          if (cellArray[idRight].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottomRight() {
          if (cellArray[idBottomRight].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottom() {
          if (cellArray[idBottom].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function bottomLeft() {
          if (cellArray[idBottomLeft].classList.contains('bomb')) {
            bombCount += 1
          }
        }
        function left() {
          if (cellArray[idLeft].classList.contains('bomb')) {
            bombCount += 1
          }
        }
      }

      // ! This checks for mines
      if (cell.classList.contains('bomb')) {
        alert('Boom!')
        cell.classList.add('reveal')
      } else {
        console.log(cell)
        mineCheck(cell)
      }

    })

  })

}


// ! Starts and resets the game

startBtn.addEventListener('click', () => {
  if (gameOn === false) {
    startGame()
    gameOn = true
  }
})

resetBtn.addEventListener('click', () => {
  if (gameOn === true) {
    rngArray = []
    cellArray = []
    gameOn = false
    grid.innerHTML = ''
  }
})