import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/navbar.css'
import './styles/loginAndSignup.css'
import './styles/booking.css'
import './styles/settings.css'
import './styles/cart.css'
import './styles/accomm.css'
import './styles/amenities.css'
import './styles/gallery.css'
import GlobalContextProvider from './context/globalContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
)