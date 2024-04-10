import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/login.css'
import './styles/admin.css'
import { BrowserRouter } from 'react-router-dom'
import GlobalContextProvider from './context/globalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
)
