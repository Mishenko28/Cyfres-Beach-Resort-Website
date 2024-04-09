import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useGlobalContext } from './hooks/useGlobalContext'

import LoginAndSignup from './pages/LoginAndSignup'
import Home from './pages/Home'
import Accommodations from './pages/Accommodations'
import Booking from './pages/Booking'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'
import AboutUs from './pages/AboutUs'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import Navbar from './Components/Navbar'

function App() {
    const { state } = useGlobalContext()

    return (
        <>
            {['/', '/accommodations', '/booking', '/amenities', '/gallery', '/about-us'].includes(useLocation().pathname) &&
                <Navbar />
            }
            <Routes>
                {!state.admin ?
                    <>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route 
                            path='/accommodations'
                            element={<Accommodations />}
                        />
                        <Route 
                            path='/booking'
                            element={<Booking />}
                        />
                        <Route 
                            path='/amenities'
                            element={<Amenities />}
                        />
                        <Route 
                            path='/gallery'
                            element={<Gallery />}
                        />
                        <Route 
                            path='/about-us'
                            element={<AboutUs />}
                        />
                        <Route 
                            path='/login'
                            element={state.user ? <Navigate to='/'/> : <LoginAndSignup type='login' />}
                        />
                        <Route 
                            path='/signup'
                            element={state.user ? <Navigate to='/'/> : <LoginAndSignup type='signup' />}
                        />
                        <Route
                            path='/admin'
                            element={state.user ? <Navigate to='/' /> : <AdminLogin />}
                        />
                        <Route path='*' element={<Navigate to='/' />} />
                    </>
                    :
                    <>
                        <Route path='/admin' element={<Admin />} />
                        <Route path='*' element={<Navigate to='/admin'/>} />
                    </>
                }
                
            </Routes>
        </>
    )
}

export default App