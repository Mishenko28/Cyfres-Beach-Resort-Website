import { Routes, Route, Navigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import useAdmin from './hooks/useAdmin'

import Dashboard from './pages/Dashboard'
import Configuration from './pages/Configuration'
import Utilities from './pages/Utilities'
import Settings from './pages/Settings'
import Login from './pages/Login'

import Users from './pages/Configuration/Users'
import Reservation from './pages/Dashboard/Reservation'
import Accommodations from './pages/Configuration/Accommodations'

import RootLayout from './layouts/RootLayout'

import TokenExpired from './components/TokenExpired'
import OfflinePage from './components/OfflinePage'
import PCOnly from './components/PCOnly'
import Amenities from './pages/Configuration/Amenities'
import Gallery from './pages/Configuration/Gallery'
import AboutUs from './pages/Configuration/AboutUs'

function App() {
    const { state } = useAdmin()

    if (state.admin.expired) { return <TokenExpired /> }
    if (isMobile) { return <PCOnly /> }
    if (!navigator.onLine) { return <OfflinePage /> }

    return (
        <Routes>
            {state.admin.email ?
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<h1>In development...</h1>} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route path='reservation' element={<Reservation />} />
                        <Route path='reports' element={<h1>reports</h1>} />
                    </Route>
                    <Route path="configuration" element={<Configuration />}>
                        <Route path='home' element={<h1>home</h1>} />
                        <Route path='accommodation' element={<Accommodations />} />
                        <Route path='amenities' element={<Amenities />} />
                        <Route path='gallery' element={<Gallery />} />
                        <Route path='about-us' element={<AboutUs />} />
                        <Route path='users' element={<Users />} />
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
                    <Route path="/login" element={<Login />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            }
        </Routes>
    )
}

export default App
