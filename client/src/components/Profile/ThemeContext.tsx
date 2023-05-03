import React, { createContext, useContext, useState } from 'react';

// Define the default themes

  export interface Theme {
    mode: string;
    backgroundColor: string;
    color: string;
  }

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}


const themes = {
  light: {
    mode: 'light',
    backgroundColor: '#fff',
    color: '#333',
  },
  dark: {
    mode: 'dark',
    backgroundColor: '#333',
    color: '#fff',
  },
};

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

// Create a provider for the theme
const ThemeProvider = ({ children }) => {
  // Set the initial theme to light
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // Define a function for toggling the theme
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light)
    console.log('Am I toggling?')
    ;
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// A custom hook for consuming the theme
const useTheme = () => useContext(ThemeContext).theme;

export { ThemeProvider, useTheme };