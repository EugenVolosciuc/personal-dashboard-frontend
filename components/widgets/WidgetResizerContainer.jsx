import React from 'react'

import WidgetResizer from 'components/widgets/WidgetResizer'

const WidgetResizerContainer = ({ widget }) => {

  return (
    <>
      <WidgetResizer orientation="vertical" widget={widget} />
      <WidgetResizer orientation="horizontal" widget={widget} />
    </>
  )
}

export default WidgetResizerContainer
