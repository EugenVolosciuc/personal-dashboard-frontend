import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { Card } from 'components/ui'
import NewTodoInput from 'components/widgets/todos/NewTodoInput'
import NonCompletedTodosList from 'components/widgets/todos/NonCompletedTodosList'
import CompletedTodosList from 'components/widgets/todos/CompletedTodosList'

const TodosCard = () => {
  const [showNewTodoInput, setShowNewTodoInput] = useState(false)

  const toggleNewTodoInput = () => setShowNewTodoInput(!showNewTodoInput)

  return (
    <Card 
      title="Todos"
      extra={<FontAwesomeIcon onClick={toggleNewTodoInput} icon={showNewTodoInput ? faMinus : faPlus} className="icon-hover icon-hover-primary" />}
    >
      {showNewTodoInput && <NewTodoInput toggleNewTodoInput={toggleNewTodoInput} />}
      <NonCompletedTodosList />
      <CompletedTodosList />
    </Card>
  )
}

export default TodosCard
