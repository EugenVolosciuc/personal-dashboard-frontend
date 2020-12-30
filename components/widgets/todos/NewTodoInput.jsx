import React, { useState } from 'react'
import axios from 'axios'

import { ClearInput, Button } from 'components/ui'

const NewTodoInput = ({ toggleNewTodoInput }) => {
  const [value, setValue] = useState('')

  const handleClick = async () => {
    try {
      await axios.post('/todos', { title: value })
      toggleNewTodoInput()
    } catch (error) {
      console.log("ERROR CREATING TODO", error)
    }
  }

  return (
    <div className="flex overflow-hidden">
      <ClearInput value={value} handleChange={setValue} size="sm" className="w-3/5 mr-2" />
      <Button type="primary" size="sm" onClick={handleClick} className="w-2/5">Add</Button>
    </div>
  )
}

export default NewTodoInput
