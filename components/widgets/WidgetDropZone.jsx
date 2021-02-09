
import React, { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'

import { Loader, Empty } from 'components/ui'
import WidgetPositioner from 'components/widgets/WidgetPositioner'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import Grid from 'components/grid-system/Grid'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import { getWidthHeightPositionOfWidget } from 'utils/functions/grid'

const WidgetDropZone = () => {
  const { dashboardEditMode } = useDashboardEditMode()
  const { widgetPositions, isValidating } = useWidgetPositions()

  const renderWidgets = () => isArray(widgetPositions) && widgetPositions.map(position => {
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
  })

  const widgets = useMemo(() => renderWidgets(), [widgetPositions])

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
          <Empty textClassname="text-lg" content="Add new widgets by dragging the desired widget to the screen." />
          {/* <p className="text-center text-lg font-medium text-secondary"></p> */}
        </div>
      }

      {widgets}
    </div>
  )
}

export default WidgetDropZone