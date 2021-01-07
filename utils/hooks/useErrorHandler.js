import { useAlert } from 'react-alert'

const useErrorHandler = () => {
  const alert = useAlert()

  const errorHandler = error => {
    if (error.response) {
      const { data, status, statusText } = error.response

      if (status === 400) {
        console.log("ERROR WITH FIELDS, PROBABLY IN A FORM")
      } else alert.error(data.errors || data.message || statusText)
    } else if (error.request) {
      console.log("Request error", error.request)
    } else console.log("App error", error)
  }

  return errorHandler
}

export default useErrorHandler