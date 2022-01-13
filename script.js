const Gameboard = (
  function () {
    const boardElement = document.querySelector('[data-board]')
    const boardCells = () => document.querySelectorAll('.game-board__spot')

    const grid = ['','','','','','','','','']

    const winningConditions = [
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6]
    ]
    
    const checkWin = (currentMark) => {
      return winningConditions.some(condition => {
        const check = condition.every(index => {
          return grid[index] === currentMark
        })

        return check === true
      })
    }

    const renderGrid = () => {
      const gridTemplate = grid.map((item, index) => {
        if(!item) {
          return /*html*/ `
            <div data-cell class="game-board__spot" id="${index}"></div>
          `
        } else if(item === 'o') {
          return /*html*/ `
            <div circle
              data-cell 
              style="background-image: url('/images/circle.svg')"
              class="game-board__spot" 
              index="${index}"></div>
          `
        } else {
          return /*html*/ `
            <div cross
              style="background-image: url('/images/cross.svg')"
              class="game-board__spot" 
              data-cell
              index="${index}" >
            </div>
          `
        }
      })
      boardElement.innerHTML = gridTemplate.join('')
      InteractionHandler.changeSymbol()
    }

    const clearGrid = () => {
      grid.forEach((item, index) => {
        item
        grid[index] = ''
        InteractionHandler.selected = false
        renderGrid()
      } )
    }

    return {
      boardElement,
      grid,
      renderGrid,
      clearGrid,
      winningConditions,
      checkWin,
      boardCells
    }
  }
)()

const InteractionHandler = (
  function() {

    const playerOptions = document.querySelector('[data-options]')
    
    let selected = false

    const selectPlayer = () => {
      playerOptions.addEventListener('click', (event) => {
        event.stopPropagation()
        const target = event.target.closest('.player-selection__item')

        if (target && !selected) {
          target.setAttribute('selected', '')
          if(target.hasAttribute('data-circle')) {
            placeMarker('o')
            selected = true 
          } else {
            placeMarker('x')
            selected = true
          }
        }

      })
    }

    const resetSelection = () => {
      //selected = false
      const options = playerOptions.querySelectorAll('.player-selection__item')

      options.forEach(option => {
        option.removeAttribute('selected')
      })
    }

    let currentSymbol = ''

    const placeMarker = (marker) => {
      Gameboard.boardCells().forEach(cell => {
        cell.addEventListener('click', event => {
        event.stopPropagation()
        const target = event.target
        
        if(target.hasAttribute('data-cell') && selected) {
          if(!(target.hasAttribute('circle') || target.hasAttribute('cross'))){
            Gameboard.grid[target.id] = marker
          }
        }
        
        currentSymbol = marker
        Gameboard.renderGrid()
        Gameboard.checkWin(marker) ? console.log(`${marker} wins`) : ''
        })
      })
    }

    const changeSymbol = () => {
      if (currentSymbol === 'o') {
        placeMarker('x')
      } else if (currentSymbol === 'x') {
        placeMarker('o')
      }
    }

    return {
      placeMarker,
      resetSelection,
      selectPlayer,
      selected,
      changeSymbol
    }
  }
)()

Gameboard.renderGrid()
InteractionHandler.selectPlayer()



// const Player = function(name) {
//   const playerName = name

//   return {
//     playerName
//   }
// }
