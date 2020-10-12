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

  // ! This assigns random backgrounds 
  for (let i = 0; i < cellArray.length; i++){
    const rng = Math.floor(Math.random() * 135)
    const randomBg = `bg-${rng}`
    cellArray[i].classList.add(randomBg)
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
    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      if (!cell.classList.contains('safe')) {
        cell.classList.toggle('flag')
     
      }
    })

    cell.addEventListener('click', () => {

      function mineCheck(cell) {
        cell.style.backgroundImage = 'none'

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

        // ! This checks for valid cells to check for mines
        cell.classList.add('safe')
        cell.classList.remove('flag')
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

        // ! This checks valid cells and adds to the mine count
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

      // ! This checks for mines
      if (cell.classList.contains('flag')) {
        return
      } else if (cell.classList.contains('bomb')) {
        // alert('Boom!')
        cell.classList.add('reveal')
        cell.removeEventListener('click', startGame)
        
      } else {

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