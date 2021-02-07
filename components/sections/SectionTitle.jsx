import React from 'react'

const SectionTitle = ({title, subtitle}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-6">
      {title && <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>}
      {subtitle && <h4 className="text-xl md:text-2xl text-gray-400">{subtitle}</h4>}
    </div>
  )
}

export default SectionTitle
