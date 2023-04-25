import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme?.background || '#fff'};
    color: ${(props) => props.theme?.text || '#333'};
  }
`;

const ThemeButton = styled.button`
  background-color: ${(props) => props.theme?.background || '#fff'};
  color: ${(props) => props.theme?.text || '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 16px;
`;

interface ThemeProviderProps {
  theme: {
    background: string;
    text: string;
  };
  children: React.ReactNode;
}

export const themes = {
  light: {
    background: '#fff',
    text: '#333',
  },
  dark: {
    background: '#333',
    text: '#fff',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };


  return(
<ThemeContext.Provider value={{ theme, toggleTheme }}>;
{children}
</ThemeContext.Provider>
  )
}