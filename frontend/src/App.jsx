import { Routes, Route, Navigate } from 'react-router-dom'
import { useGlobalContext } from './hooks/useGlobalContext'

import LoginAndSignup from './pages/LoginAndSignup'
import Home from './pages/Home'
import Accommodations from './pages/Accommodations'
import Booking from './pages/Booking'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'
import AboutUs from './pages/AboutUs'
import Navbar from './components/Navbar'

function App() {
    const { state } = useGlobalContext()

    return (
        <>
            <Navbar />
            <Routes>
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
                <Route path='*' element={<Navigate to='/' />} />                
            </Routes>
        </>
    )
}

export default App