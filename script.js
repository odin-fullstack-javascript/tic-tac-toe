const Gameboard = (
  function () {
    const boardElement = document.querySelector('[data-board]')

    const grid = ['','','','','','','','','']

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
    }

    return {
      boardElement,
      grid,
      renderGrid
    }
  }
)()

const InteractionHandler = (
  function() {

    const playerOptions = document.querySelector('[data-options]')

    const selectPlayer = () => {
      playerOptions.addEventListener('click', (event) => {
        event.stopPropagation()
        const target = event.target.closest('.player-selection__item')
        if (target) {
          target.setAttribute('selected', '')

          if(target.hasAttribute('data-circle')) {
            console.log('circle selected')
            InteractionHandler.placeMarker('o')
          } else {
            console.log('cross selected')
            InteractionHandler.placeMarker('x')
          }
        }
      }, {once: true})
    }

    const placeMarker = (playerName) => {
      Gameboard.boardElement.addEventListener('click', (event) => {
        event.stopPropagation()
        const target = event.target
        if(target.hasAttribute('data-cell')) {
          if(!(target.hasAttribute('circle') || target.hasAttribute('cross'))){
            Gameboard.grid[target.id] = playerName
            Gameboard.renderGrid()
          }
        }
      })
    }

    return {
      placeMarker,
      selectPlayer
    }
  }
)()

Gameboard.renderGrid()
InteractionHandler.selectPlayer()


// const Player = function() {

// }