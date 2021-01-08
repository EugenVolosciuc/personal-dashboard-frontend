import React, { useEffect, useState } from 'react'

import styles from 'components/ui/styles/Dropdown.module.scss'

const ItemsContainer = ({ items, toggleContainer }) => {
  useEffect(() => {
    window.addEventListener('click', toggleContainer)
    
    return () => window.removeEventListener('click', toggleContainer)
  }, [])

  return (
    <ul className={styles['items-container']}>
      {items.map(item => {
        return (
          <li key={`${item.title}-dropdown-item`} onClick={item.onClick} className={`dropdown-item ${styles.item}`}>
            <p className="dropdown-item-title">{item.title}</p>
          </li>
        )
      })}
    </ul>
  )
}

// toggler: react node
// items: [{ title, href, as, onClick }]
const Dropdown = ({ toggler, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleContainer = () => setIsOpen(!isOpen)

  return (
    <span className="relative">
      <span onClick={toggleContainer}>{toggler}</span>
      {isOpen && <ItemsContainer items={items} toggleContainer={toggleContainer} />}
    </span>
  )
}

export default Dropdown
