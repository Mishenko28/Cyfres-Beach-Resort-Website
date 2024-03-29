import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { useGlobalContext } from './hooks/useGlobalContext'

import Navbar from './Components/Navbar'
import LoginAndSignup from './pages/LoginAndSignup'
import Home from './pages/Home'
import Accomodations from './pages/Accomodations'
import Booking from './pages/Booking'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'

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
                    path='/accomodations'
                    element={<Accomodations />}
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
                    path='/login'
                    element={state.user ? <Navigate to='/'/> : <LoginAndSignup type='login' />}
                />
                <Route 
                    path='/signup'
                    element={state.user ? <Navigate to='/'/> : <LoginAndSignup type='signup' />}
                />
            </Routes>
        </>
    )
}

export default App