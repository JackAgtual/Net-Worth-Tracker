import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/theme.ts'
import { BrowserRouter } from 'react-router-dom'

const dev = import.meta.env.DEV || false
console.log(import.meta.env.VITE_TEST_ENV_VARIABLE)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={dev ? '' : '/Net-Worth-Tracker'}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
