import React, { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'

import GridDot from 'components/gridSystem/GridDot'
import styles from 'components/gridSystem/styles/Grid.module.scss'
import useGridSize from 'utils/hooks/useGridSize'

const Grid = () => {
  const { gridSize } = useGridSize()

  console.log("GRID SIZE", gridSize)

  const getGridRows = () => {
    const gridRows = []

    // Loop through rows
    for (let r = 0; r < gridSize.height; r++) {
      const rowItems = []

      // Loop through items in row
      for (let i = 0; i < gridSize.length; i++) {
        rowItems.push(<GridDot key={`grid-dot-${r}-${i}`} />)
      }

      gridRows.push(<div key={`grid-row-${r}`} className={styles['grid-row']}>{rowItems}</div>)
    }

    return gridRows
  }

  return (
    <div className={styles.grid} id="grid">
      {getGridRows()}
    </div>
  )
}

export default Grid
