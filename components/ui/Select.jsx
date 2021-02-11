import React from 'react'
import SelectComponent from 'react-select'

const customStyles = {
  option: (provided) => ({
    ...provided,
    textAlign: 'left'
  })
}

const Select = ({ options, value, onChange }) => {

  return <SelectComponent 
    options={options}
    styles={customStyles}
    value={value}
    onChange={onChange}
    theme={theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#fc4445'
      }
    })}
  />
}

export default Select
