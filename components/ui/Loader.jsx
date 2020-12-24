import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loader = ({size = 'lg'}) => {
  return <FontAwesomeIcon icon={faSpinner} spin size={size} className="text-purple-500" />
}

export default Loader
