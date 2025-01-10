'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('#fff') // Initial theme color

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', theme)

    // Set text color based on theme
    const textColor = theme === '#151617' ? '#f54e07' : '#000'
    document.documentElement.style.setProperty('--text-color', textColor)
  }, [theme])

  const toggleTheme = ({ color }) => {
    setTheme(color)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
