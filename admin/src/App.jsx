import { Routes, Route, Navigate } from 'react-router-dom'
import { useGlobalContext } from './hooks/useGlobalContext'

import Login from './pages/Login'
import Admin from './pages/Admin'

function App() {
    const { state } = useGlobalContext()
    
    return (
        <Routes>
            <Route path='/login' element={state.admin ? <Navigate to='/' /> : <Login />} />
            <Route path='/' element={state.admin ? <Admin /> : <Navigate to='/login' />} />
        </Routes>
    )
}

export default App