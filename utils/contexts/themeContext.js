import { createContext, useState, useEffect } from 'react'

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const themeFromLocalStorage = window.localStorage.getItem("pd-color-theme")
    if (typeof themeFromLocalStorage === "string") {
      return themeFromLocalStorage
    }

    // For when a dark theme will be added
    // const userMedia = window.matchMedia("(prefers-color-scheme: dark)")
    // if (userMedia.matches) {
    //   return "dark"
    // }
  }

  return "light"
}

const themeContext = createContext()

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = newTheme => {
    const root = window.document.documentElement
    const isDark = newTheme === "dark"

    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(newTheme)

    localStorage.setItem("pd-color-theme", newTheme)
  }

  if (initialTheme) rawSetTheme(initialTheme)

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  // useEffect(() => {
  //   const root = window.document.documentElement

  //   console.log("ROOT CLASSLIST", root.classList)
  // }, [])

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  )
}

export default themeContext