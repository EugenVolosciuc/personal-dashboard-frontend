/**
 * Calculates the distance between two horizontal grid dots and two vertical grid dots
 * @param {HTMLElement} gridDot Dot on which the user drops the widget
 * @returns {Object} Horizontal length and vertical length
 */
export const getGridLengthUnits = gridDot => {

  // Get index of the clicked dot in row
  let indexOfClickedDot = 0
  let gridDotClone = gridDot.cloneNode() // Cloning node so that gridDot isn't mutated

  for (let i = 0; (gridDotClone = gridDotClone.previousSibling); i++) {
    indexOfClickedDot++
  }

  const gridLength = {}

  const gridDotRect = gridDot.getBoundingClientRect()
  const nextSiblingRect = gridDot.nextSibling.getBoundingClientRect()
  const nextRowSiblingRect = gridDot.parentElement.nextSibling.children[indexOfClickedDot].getBoundingClientRect()

  // Get horizontal length between two dots
  gridLength.horizontalLength = nextSiblingRect.left - gridDotRect.right

  // Get vertical length between two dots
  gridLength.verticalLength = nextRowSiblingRect.top - gridDotRect.bottom

  return gridLength
}

export const getWidthHeightPositionOfWidget = (dotCoordinates, minWidth = 2, minHeight = 2) => {
  const grid = document.querySelector('#grid')
  const gridDot = grid.children[dotCoordinates.y].children[dotCoordinates.x]
  const gridDotRect = gridDot.getBoundingClientRect()

  const { horizontalLength, verticalLength } = getGridLengthUnits(gridDot)

  return {
    widgetWidth: Math.round((horizontalLength * minWidth) + (gridDotRect.width * (minWidth - 1))),
    widgetHeight: Math.round((verticalLength * minHeight) + (gridDotRect.height * (minHeight - 1))),
    x: gridDotRect.left + gridDotRect.width,
    y: gridDotRect.top + gridDotRect.height
  }
}

export const getWidgetDotCoordinates = (gridDot, minWidth = 2, minHeight = 2) => {
    // Get index of the clicked dot in row and its row
    let indexOfClickedDot = 0
    let indexOfClickedRow = 0
    let gridDotRow = gridDot.parentElement

    for (let i = 0; (gridDot = gridDot.previousElementSibling); i++) {
      indexOfClickedDot++
    }

    for (let i = 0; (gridDotRow = gridDotRow.previousElementSibling); i++) {
      indexOfClickedRow++
    }

    return { x: indexOfClickedDot, y: indexOfClickedRow }
}

export const checkCanDrop = (gridSize, dropCoordinates, minWidth = 2, minHeight = 2) => {
  const widthIsOkay = dropCoordinates.x + 1 <= gridSize.width - minWidth
  const heightIsOkay = dropCoordinates.y + 1 <= gridSize.height - minHeight

  return widthIsOkay && heightIsOkay
}