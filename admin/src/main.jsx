import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AdminContextProvider } from './hooks/useAdmin'
import './styles/index.css'
import './styles/navigation.css'
import './styles/login.css'
import './styles/body.css'
import './styles/config.css'
import './styles/dash.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AdminContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AdminContextProvider>
    </React.StrictMode>,
)
