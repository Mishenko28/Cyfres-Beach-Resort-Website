import React from "react"
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'

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
                    element={<Login />}
                />
                <Route 
                    path='/signup'
                    element={<Signup />}
                />
            </Routes>
        </>
    )
}

export default App