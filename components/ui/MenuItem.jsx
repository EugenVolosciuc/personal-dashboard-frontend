import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/ui/styles/MenuItem.module.scss'
import { DraggableMenuItem } from 'components/ui'

// Props:
// menuType: 'side' | 'top'
const MenuItem = ({ menuData, menuType = 'side', active = false, className = '', isParent, isOpen }) => {
  const { label, title, href, as, onClick, component } = menuData

  const finalClassName = `${className} ${styles['menu-item']} ${menuType === 'side' ? styles.side : styles.top} ${active ? styles.active : ''}`

  const isLink = !!href
  const isButton = !!onClick
  const isDragable = !!component

  const arrowForParents = isParent && <FontAwesomeIcon icon={faChevronDown} className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`} />

  return (
    <div className={isDragable ? styles['draggable-item-container'] : ''}>
      {isLink &&
        <Link
          href={href}
          as={as || href}>
          <a className={finalClassName}>
            {label}
            {arrowForParents}
          </a>
        </Link>
      }
      {isButton &&
        <p
          onClick={onClick}
          className={finalClassName}>
          {label}
          {arrowForParents}
        </p>
      }
      {isDragable && <DraggableMenuItem item={menuData} />}
    </div>
  )
}

export default MenuItem
