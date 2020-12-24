import React from 'react'
import Link from 'next/link'

import styles from './styles/MenuItem.module.scss'

// Props:
// menuType: 'side' | 'top'
const MenuItem = ({ menuData, menuType = 'side', active = false, className = '' }) => {
  const { label, href, as, onClick } = menuData

  const finalClassName = `${className} ${styles['menu-item']} ${menuType === 'side' ? styles.side : styles.top} ${active ? styles.active : ''}`

  return (
    <>
      {href
        ? <Link
          href={href}
          as={as || href}>
          <a className={finalClassName}>{label}</a>
        </Link>
        : <p
          onClick={onClick}
          className={finalClassName}>
          {label}
        </p>
      }
    </>
  )
}

export default MenuItem
