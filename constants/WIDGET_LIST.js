import { NotesCard, TodosCard } from 'components/widgets/cards'

const WIDGET_LIST = {
    // TODO: Custom card
  todos: {
      title: 'Todos',
      component: TodosCard
  },
  // {
  //     title: 'Expenses',
  //     component: ExpensesCard
  // },
  notes: {
    title: 'Notes',
    component: NotesCard
  }
}

export default WIDGET_LIST