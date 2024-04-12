import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/navbar.css'
import './styles/loginAndSignup.css'
import GlobalContextProvider from './context/globalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </GlobalContextProvider>
)