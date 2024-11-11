// import { useState } from 'react'
import GlobalStyles from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'

import './App.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'





function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
