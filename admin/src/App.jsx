import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Dashboard from './pages/Dashboard'
import Configuration from './pages/Configuration'
import Utilities from './pages/Utilities'
import Settings from './pages/Settings'
import Login from './pages/Login'

import RootLayout from './layouts/RootLayout'

function App() {
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const admin = localStorage.getItem('cyfresAdmin')
        admin && setAdmin(JSON.parse(admin))
    }, [])

    return (
        <Routes>
            {admin ?
                <Route path="/" element={<RootLayout admin={admin} setAdmin={setAdmin} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/configuration" element={<Configuration />} />
                    <Route path="/utilities" element={<Utilities />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Route>
                :
                <>
                    <Route path="/login" element={<Login setAdmin={setAdmin} />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            }
        </Routes>
    )
}

export default App
