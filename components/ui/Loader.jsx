import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loader = ({ size = 'lg', color = "accent" }) => {
  return <FontAwesomeIcon icon={faSpinner} spin size={size} className={`${color === "white" ? "text-white" : "text-accent"}`} />
}

export default Loader
