import React from "react"
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import LoginAndSignup from './pages/LoginAndSignup'
import Home from './pages/Home'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route 
                    path='/'
                    element={<Home />}
                />
                <Route 
                    path='/login'
                    element={<LoginAndSignup type='login' />}
                />
                <Route 
                    path='/signup'
                    element={<LoginAndSignup type='signup' />}
                />
            </Routes>
        </>
    )
}

export default App