import React, { Fragment } from 'react'

import GridDot from 'components/gridSystem/GridDot'
import GridPillar from 'components/gridSystem/GridPillar'
import styles from 'components/gridSystem/styles/Grid.module.scss'
import useGridSize from 'utils/hooks/useGridSize'

const Grid = ({ isShown }) => {
  const { gridSize } = useGridSize()

  const getGridRows = () => {
    const gridRows = []

    // Loop through rows
    for (let r = 0; r < gridSize.height; r++) {
      const rowDots = []
      const horizontalPillars = []

      // Add a horizontal GridPillar for every row
      horizontalPillars.push(<GridPillar key={`horizontal-grid-pillar-${r}`} orientation="horizontal" />)

      // Loop through items in row
      for (let i = 0; i < gridSize.width; i++) {
        rowDots.push(<GridDot key={`grid-dot-${r}-${i}`} />)
      }

      gridRows.push(
        <div className={styles['grid-row']} key={`grid-row-${r}`}>
          <div className={styles['dots-container']}>{rowDots}</div>
          <div className={styles['horizontal-pillars-container']}>{horizontalPillars}</div>
        </div>
      )
    }

    return gridRows
  }

  const getVerticalPillars = () => {
    const verticalPillars = []

    for (let i = 0; i < gridSize.width; i++) {
      verticalPillars.push(<GridPillar key={`vertical-grid-pillar-${i}`} orientation="vertical" />)
    }

    return <div className={styles['vertical-pillars-container']}>{verticalPillars}</div>
  }

  return (
    <div className={`${styles.grid} ${isShown ? styles.show : ''}`} id="grid">
      {getGridRows()}
      {getVerticalPillars()}
    </div>
  )
}

export default Grid
