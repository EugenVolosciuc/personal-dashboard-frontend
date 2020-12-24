import { useContext } from 'react'

import notesContext from 'utils/contexts/notesContext'

const useNotes = () => useContext(notesContext)

export default useNotes
// import axios from 'axios'
// import { useSWRInfinite } from 'swr'

// const fetcher = async url => {
//   const { data } = await axios.get(url)

//   return data
// }

// const URL = '/notes'

// // TODO: filters, search
// const useNotes = () => {
//   const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
//     index => {
//       console.log("INDEX", index)
//       return `${URL}?page=${index + 1}`
//     },
//     fetcher
//   )

//   const hasNextPage = data && !!data[data.length - 1].next
//   const fetchNextPage = () => {
//     console.log("FIRING NEXT PAGE FETCHER")
//     setSize(size + 1)
//   }

//   return { data, error, mutate, size, setSize, isValidating, hasNextPage, fetchNextPage }
// }

// export default useNotes

