import { NotesCard, TodosCard } from 'components/widgets/cards'

const WIDGET_LIST = {
    // TODO: Custom card
  todos: {
      title: 'Todos',
      component: TodosCard,
      defaultWidth: 2,
      defaultHeight: 2
  },
  // {
  //     title: 'Expenses',
  //     component: ExpensesCard
  // },
  notes: {
    title: 'Notes',
    component: NotesCard,
    defaultWidth: 2,
    defaultHeight: 3
  }
}

export default WIDGET_LIST