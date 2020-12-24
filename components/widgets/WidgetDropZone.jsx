
import React from 'react'

import WidgetPositioner from 'components/widgets/WidgetPositioner'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import Grid from 'components/gridSystem/Grid'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import { getWidthHeightPositionOfWidget } from 'utils/functions/grid'

const WidgetDropZone = () => {
  const { dashboardEditMode } = useDashboardEditMode()
  const { widgetPositions } = useWidgetPositions()

  return (
    <div className="relative w-full h-full">
      <Grid isShown={dashboardEditMode} />
      {widgetPositions && widgetPositions.map(position => {
        const widget = WIDGET_LIST[position.title]
        const widthHeightPosition = getWidthHeightPositionOfWidget({ x: position.x, y: position.y })

        return (
          <WidgetPositioner
            key={`${position.x}-${position.y}-${position.title}`}
            position={widthHeightPosition}
          >
            <widget.component />
          </WidgetPositioner>
        )
      })}
    </div>
  )
}

export default WidgetDropZone