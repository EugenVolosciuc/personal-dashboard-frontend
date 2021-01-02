import React from 'react'

import styles from 'components/widgets/styles/WidgetResizer.module.scss'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'
import WidgetResizeBorder from 'components/widgets/WidgetResizeBorder'

const WidgetResizer = ({ widget }) => {
  const { resizedWidget } = useWidgetResizeMode()

  return (
    <>
      {/* Right border */}
      <WidgetResizeBorder orientation="vertical" widget={widget} />
      {/* Bottom border */}
      <WidgetResizeBorder orientation="horizontal" widget={widget} />
    </>
  )
}

export default WidgetResizer
