import React, { useState, Fragment } from 'react'

import { TabItem } from 'components/ui'

const getAlignmentClass = align => {
  switch (align) {
    case 'center':
      return 'justify-center'
    case 'right':
      return 'justify-end'
    case 'left':
    default:
      return 'justify-start'
  }
}

// items: [{ title, content }]
const Tabs = ({ items, align = 'left' }) => {
  const [activeTab, setActiveTab] = useState(items[0].title)

  return (
    <>
      <div className={`flex ${getAlignmentClass(align)}`}>
        {items.map(item => <TabItem key={item.title + '-tab'} title={item.title} active={activeTab === item.title} handleClick={() => setActiveTab(item.title)} />)}
      </div>
      <div>
        {items.map(item => {
          return activeTab === item.title ? <div key={item.title + '-tab-content'}>{item.content}</div> : null
        })}
      </div>
    </>
  )
}

export default Tabs
