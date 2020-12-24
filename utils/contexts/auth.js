import { useState, createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export const authContext = createContext({
  user: null,
  setUser: () => null,
  userIsLoading: false,
  setUserIsLoading: () => null
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userIsLoading, setUserIsLoading] = useState(true)
  const router = useRouter()

  // On mount, send a request that checks if the user is logged in, if yes - save user to context
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/users/me')
        if (data) {
          setUser(data)
          setUserIsLoading(false)
          router.push('/dashboard')
        }
      } catch (error) {
        console.log("ERROR CHECKING IF USER IS LOGGED IN", error)
        setUserIsLoading(false)
      }
    })()
  }, [])

  return <authContext.Provider value={{ user, setUser, userIsLoading, setUserIsLoading }}>
    {children}
  </authContext.Provider>
}

// shouldBeAuthed:
// undefined - Return user
// true - If user isn't logged in, redirect to login, else return user
// false - If user is logged in, redirect to dashboard, else return user
export const useAuth = shouldBeAuthed => {
  const { user, setUser, userIsLoading, setUserIsLoading } = useContext(authContext)

  const router = useRouter()

  if (typeof window !== "undefined" && !userIsLoading) {
    if (shouldBeAuthed) {
      if (!user) router.push('/auth/login')
    } else if ( shouldBeAuthed === false) {
      if (user) router.push('/dashboard')
    }
  }

  return { user, setUser, userIsLoading, setUserIsLoading }
}