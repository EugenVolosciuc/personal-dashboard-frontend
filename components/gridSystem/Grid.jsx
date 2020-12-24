import React from 'react'

import GridDot from 'components/gridSystem/GridDot'
import styles from 'components/gridSystem/styles/Grid.module.scss'
import useGridSize from 'utils/hooks/useGridSize'

const Grid = ({ isShown }) => {
  const { gridSize } = useGridSize()

  const getGridRows = () => {
    const gridRows = []

    // Loop through rows
    for (let r = 0; r < gridSize.height; r++) {
      const rowItems = []

      // Loop through items in row
      for (let i = 0; i < gridSize.width; i++) {
        rowItems.push(<GridDot key={`grid-dot-${r}-${i}`} />)
      }

      gridRows.push(<div key={`grid-row-${r}`} className={styles['grid-row']}>{rowItems}</div>)
    }

    return gridRows
  }

  return (
    <div className={`${styles.grid} ${isShown ? styles.show : ''}`} id="grid">
      {getGridRows()}
    </div>
  )
}

export default Grid
