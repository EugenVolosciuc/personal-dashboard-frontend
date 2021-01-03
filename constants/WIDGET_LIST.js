import { NotesCard, TodosCard, WeatherCard } from 'components/widgets/cards'

const WIDGET_LIST = {
  // TODO: Custom card
  // {
  //     title: 'Expenses',
  //     component: ExpensesCard
  // },
  notes: {
    title: 'Notes',
    component: NotesCard,
    defaultWidth: 2,
    defaultHeight: 3
  },
  todos: {
    title: 'Todos',
    component: TodosCard,
    defaultWidth: 2,
    defaultHeight: 2
  },
  weather: {
    title: 'Weather',
    component: WeatherCard,
    defaultWidth: 2,
    defaultHeight: 1
  }
}

export default WIDGET_LIST