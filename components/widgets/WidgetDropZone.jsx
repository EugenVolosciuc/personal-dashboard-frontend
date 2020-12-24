  
import React, { useContext } from 'react'
import isNil from 'lodash/isNil'

import WidgetPositioner from 'components/widgets/WidgetPositioner'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import Grid from 'components/gridSystem/Grid'
import dashboardEditModeContext from 'utils/contexts/dashboardEditModeContext'

// TODO: add edit mode context and save user's widgetPositions to context
const WidgetDropZone = ({ widgetPositions }) => {
    const { editMode, setEditMode } = useContext(dashboardEditModeContext)
    
    return (
        <div className="widget-drop-zone">
            {editMode && <Grid />}
            {
                WIDGET_LIST.map(widget => {
                    if (!isNil(widgetPositions[widget.title.toLowerCase()])) {
                        return (
                            <WidgetPositioner key={`${widget.title} widget`} position={widgetPositions[widget.title.toLowerCase()]}>
                                <widget.component />
                            </WidgetPositioner>
                        )
                    }
                })
            }
        </div>
    )
}

export default WidgetDropZone