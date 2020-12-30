
import React from 'react'
import isEmpty from 'lodash/isEmpty'

import { Loader } from 'components/ui'
import WidgetPositioner from 'components/widgets/WidgetPositioner'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import Grid from 'components/gridSystem/Grid'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import { getWidthHeightPositionOfWidget } from 'utils/functions/grid'

const WidgetDropZone = () => {
  const { dashboardEditMode } = useDashboardEditMode()
  const { widgetPositions, isValidating } = useWidgetPositions()

  return (
    <div className="relative w-full h-full">
      <Grid isShown={dashboardEditMode} />
      {isEmpty(widgetPositions) && isValidating &&
        <div className="w-full h-full flex justify-center items-center">
          <Loader size="3x" />
        </div>
      }

      {isEmpty(widgetPositions) && !isValidating && !dashboardEditMode &&
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center text-lg font-medium text-gray-400">Add new widgets by dragging the desired widget to the screen.</p>
        </div>
      }

      {widgetPositions && widgetPositions.map(position => {
        const widget = WIDGET_LIST[position.title]

        const widthHeightPosition = getWidthHeightPositionOfWidget(
          {
            x: position.x,
            y: position.y
          },
          position?.width || widget.defaultWidth,
          position?.height || widget.defaultHeight
        )

        return (
          <WidgetPositioner
            key={`${position.x}-${position.y}-${position.title}`}
            widget={position}
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