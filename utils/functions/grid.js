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

export const getWidthHeightPositionOfWidget = (dotCoordinates, widgetWidth = 2, widgetHeight = 2) => {
  const grid = document.querySelector('#grid')
  const gridDot = grid.children[dotCoordinates.y].children[dotCoordinates.x]
  const gridDotRect = gridDot.getBoundingClientRect()

  const { horizontalLength, verticalLength } = getGridLengthUnits(gridDot)

  return {
    widgetWidth: Math.round((horizontalLength * widgetWidth) + (gridDotRect.width * (widgetWidth - 1))),
    widgetHeight: Math.round((verticalLength * widgetHeight) + (gridDotRect.height * (widgetHeight - 1))),
    x: gridDotRect.left + gridDotRect.width,
    y: gridDotRect.top + gridDotRect.height
  }
}

export const getWidgetDotCoordinates = gridDot => {
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

export const checkCanDrag = (itemTitle, widgetPositions) => {
  if (widgetPositions) return !widgetPositions.find(position => position.title === itemTitle.toLowerCase())

  return true
}

export const checkCanDrop = (gridSize, dropCoordinates, widgetPositions, widgetWidth = 2, widgetHeight = 2) => {
  // Check that the dragged widget isn't positioned outside the boundaries of the grid
  const widthIsOkay = dropCoordinates.x + 1 <= gridSize.width - widgetWidth
  const heightIsOkay = dropCoordinates.y + 1 <= gridSize.height - widgetHeight

  // Check that the dragged widget doesn't overlap with another widget
  const widgetsOverlap = widgetPositions.find(position => {
    // TODO: fix "Can't put widget on last line of overlapped widget (should be able to do that)"
    // const yAxisIsFirstOfDraggedWidgetAndLastOfOverlappedWidget = 
    
    const xAxisOverlaps = dropCoordinates.x > position.x - widgetWidth && dropCoordinates.x < position.x + widgetWidth
    const yAxisOverlaps = dropCoordinates.y > position.y - widgetHeight && dropCoordinates.y < position.y + widgetHeight

    console.log("______")
    // console.log("xAxisOverlaps", xAxisOverlaps)
    // console.log("yAxisOverlaps", yAxisOverlaps)

    console.log("position", position)
    console.log("dropCoordinates", dropCoordinates)

    return xAxisOverlaps && yAxisOverlaps
  })

  return widthIsOkay && heightIsOkay && !widgetsOverlap
}