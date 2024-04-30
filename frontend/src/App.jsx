import { Navigate, Route, Routes } from 'react-router-dom'
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
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path='booking' element={<Booking />} />
                <Route path='accommodations' element={<Accommodations />} />
                <Route path='amenities' element={<Amenities />} />
                <Route path='gallery' element={<Gallery />} />
                <Route path='about-us' element={<AboutUs />} />
                {!state.user &&
                    <>
                        <Route path='login' element={<LoginAndSignup type='login' />} />
                        <Route path='signup' element={<LoginAndSignup type='signup' />} />
                    </>
                }
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default App