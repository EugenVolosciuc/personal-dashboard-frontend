import React, { useState } from 'react'

import { MenuItem } from 'components/ui'
import styles from 'components/ui/styles/MenuItem.module.scss'

const NestedMenuItem = ({ menuData, menuType = 'side', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const parentMenuData = {
    label: menuData.label,
    onClick: () => setIsOpen(!isOpen)
  }

  console.log("IS OPEN", isOpen)

  return (
    <div className="w-full">
      <MenuItem menuData={parentMenuData} menuType={menuType} className={className} isParent isOpen={isOpen} />
      <div className={styles['sub-items']}>
        {isOpen && menuData.subItems.map((item, index) => {
          return <MenuItem 
            key={`${menuData.label}-sub-item-${index}`} 
            menuType={menuType}
            className={className}
            menuData={item}
          />
        })}
      </div>
    </div>
  )
}

export default NestedMenuItem
