import React from 'react'

const Empty = ({ content = "No data", textClassname = "", containerClassname = "" }) => {
  return (
    <div className={`p-4 ${containerClassname}`}>
      <p className={`text-center text-gray-400 font-medium ${textClassname}`}>{content}</p>
    </div>
  )
}

export default Empty
