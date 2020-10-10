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
      // const id = Number(cell.id)
      // console.log(cell)


      // ! DRY adjacent checkers 
      const idLeft = Number(cell.id) - 1
      const idTopLeft = Number(cell.id) - width - 1
      const idTop = Number(cell.id) - width
      const idTopRight = Number(cell.id) - width + 1
      const idRight = Number(cell.id) + 1
      const idBottomRight = Number(cell.id) + width + 1
      const idBottom = Number(cell.id) + width
      const idBottomLeft = Number(cell.id) + width - 1

      // ! DRY boundry checkers
      const boundTopLeft = 0
      const boundTopRight = width - 1
      const boundBottomRight = (width ** 2) - 1
      const boundBottomLeft = width ** 2 - width

      // ! This checks for mines
      if (cell.classList.contains('bomb')) {
        alert('Boom!')
        cell.classList.add('reveal')

      } else {
        mineCheck(cell)

      }

      // ! This checks for valid cells to check for mines

      function mineCheck(cell) {
        // cell = document.getElementById(id)
        // console.log(cell)
        if (Number(cell.id) === boundTopLeft) {
          right(); bottomRight(); bottom()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) === boundTopRight) {
          bottom(); bottomLeft(); left()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) === boundBottomLeft) {
          right(); topRight(); top()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) === boundBottomRight) {
          top(); topLeft(); left()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) < width) {
          right(); bottomRight(); bottom(); bottomLeft(); left()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) % width === width - 1) {
          top(); bottom(); bottomLeft(); left(); topLeft()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else if (Number(cell.id) > (width ** 2) - width - 1) {
          right(); topRight(); top(); topLeft(); left()
          cell.innerHTML = bombCount
          cell.classList.add('safe')
        } else if (Number(cell.id) % width === 0) {
          top(); topRight(); right(); bottomRight(); bottom()
          cell.classList.add('safe')
          cell.innerHTML = bombCount
        } else {
          topLeft(); top(); topRight(); right(); bottomRight(); bottom(); bottomLeft(); left()
          cell.classList.add('safe')
          cell.innerHTML = bombCount

          //  mineCheck(idTopRight); mineCheck(idRight); mineCheck(idBottomRight); mineCheck(idBottom); mineCheck(idBottomLeft); mineCheck(idLeft); mineCheck(idTopLeft)
        }


        if (bombCount === null && !cell.classList.contains('noBombs') || !cell.classList.contains('safe')) {
          const cellTop = document.getElementById(idTop)
          const cellTopLeft = document.getElementById(idTopLeft)
          const cellLeft = document.getElementById(idLeft)
          const cellBottomLeft = document.getElementById(idBottomLeft)
          const cellBottom = document.getElementById(idBottom)
          const cellBottomRight = document.getElementById(idBottomRight)
          const cellRight = document.getElementById(idRight)
          const cellTopRight = document.getElementById(idTopRight)
          cell.classList.add('noBombs')
          cell.innerHTML = bombCount
          if (Number(cell.id) === boundTopLeft) {
            mineCheck(cellRight); mineCheck(cellBottomRight); mineCheck(cellBottom)
          } else if (Number(cell.id) === boundTopRight) {
            mineCheck(cellBottom); mineCheck(cellBottomLeft); mineCheck(cellLeft)
          } else if (Number(cell.id) === boundBottomLeft) {
            mineCheck(cellRight); mineCheck(cellTopRight); mineCheck(cellTop)
          } else if (Number(cell.id) === boundBottomRight) {
            mineCheck(cellLeft); mineCheck(cellTopLeft); mineCheck(cellRight)
          } else if (Number(cell.id) < width) {
            mineCheck(cellRight); mineCheck(cellBottomRight); mineCheck(cellBottom); mineCheck(cellBottomLeft); mineCheck(cellLeft)
          } else if (Number(cell.id) % width === width - 1) {
            mineCheck(cellTop); mineCheck(cellBottom); mineCheck(cellBottomLeft); mineCheck(cellLeft); mineCheck(cellTopLeft)
          } else if (Number(cell.id) > (width ** 2) - width - 1) {
            mineCheck(cellRight); mineCheck(cellTopRight); mineCheck(cellTop); mineCheck(cellTopLeft); mineCheck(cellLeft)
          } else if (Number(cell.id) % width === 0) {
            mineCheck(cellTop); mineCheck(cellTopRight); mineCheck(cellRight); mineCheck(cellBottomRight); mineCheck(cellBottom)
          } else {
            mineCheck(cellTop); mineCheck(cellTopLeft); mineCheck(cellLeft); mineCheck(cellBottomLeft); mineCheck(cellBottom); mineCheck(cellBottomRight); mineCheck(cellRight); mineCheck(cellTopRight)
          }




        }


        bombCount = null

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

      // function cascade() {

      // }

      bombCount = null

    })
    let bombCount = null
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