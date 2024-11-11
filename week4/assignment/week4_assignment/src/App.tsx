// import { useState } from 'react'
import GlobalStyles from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'

import './App.css'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

    </ThemeProvider>
  )
}

export default App
