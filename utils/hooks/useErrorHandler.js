import axios from 'axios'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'

import { useAuth } from 'utils/contexts/auth'

const useErrorHandler = () => {
  const alert = useAlert()
  const router = useRouter()
  const { setUser } = useAuth()

  const errorHandler = (error, setError) => {
    if (axios.isCancel(error)) return

    if (error.response) {
      const { data, status, statusText } = error.response

      if (status === 401) {
        setUser(null)
        router.push('/auth/login')
      } else if (status === 400) {
        if (setError) {
          if (data.field) {
            setError(data.field, { type: 'manual', message: data.errors })
          } else {
            alert.error(data.errors || data.message || statusText)
          }
        }
      } else alert.error(data.errors || data.message || statusText)
    } else if (error.request) {
      console.log("Request error", error.request)
    } else console.log("App error", error)
  }

  return errorHandler
}

export default useErrorHandler