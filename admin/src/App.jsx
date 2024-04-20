import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Dashboard from './pages/Dashboard'
import Configuration from './pages/Configuration'
import Utilities from './pages/Utilities'
import Settings from './pages/Settings'
import Login from './pages/Login'

import Users from './pages/Configuration/Users'

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
                    <Route index element={<h1>helloo</h1>} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route path='reservation' element={<h1>reservation</h1>} />
                        <Route path='reports' element={<h1>reports</h1>} />
                    </Route>
                    <Route path="configuration" element={<Configuration />}>
                        <Route path='home' element={<h1>home</h1>} />
                        <Route path='accommodation' element={<h1>accommodation</h1>} />
                        <Route path='amenities' element={<h1>amenities</h1>} />
                        <Route path='gallery' element={<h1>gallery</h1>} />
                        <Route path='about-us' element={<h1>about us</h1>} />
                        <Route path='users' element={<Users admin={admin} />} />
                    </Route>
                    <Route path="utilities" element={<Utilities />}>
                        <Route path='admin' element={<h1>admin</h1>} />
                        <Route path='archive' element={<h1>archive</h1>} />
                        <Route path='activity-logs' element={<h1>activity logs</h1>} />
                        <Route path='backup-and-reset' element={<h1>backup & reset</h1>} />
                    </Route>
                    <Route path="settings" element={<Settings />}>
                        <Route path='profile' element={<h1>profile</h1>} />
                    </Route>
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
