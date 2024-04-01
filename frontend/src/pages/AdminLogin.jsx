import React, { useState } from 'react'
import '../styles/adminLogin.css'
import { useGlobalContext } from '../hooks/useGlobalContext'

export default function AdminLogin() {
    const { state, dispatch } = useGlobalContext()

    const [admin, setAdmin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({admin, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } else {
            localStorage.setItem('admin', JSON.stringify(json))
            dispatch({type: "ADMIN_LOGIN", payload: json})
        }
        setIsLoading(false)
    }

  return (
    <div className='login-admin-card'>
        <form onSubmit={handleSubmit}>
            <h1>Welcome to Admin</h1>
            {error && <h2>{error}</h2>}
            <div>
                <label>Admin:</label>
                <input
                    autoComplete='off'
                    required
                    id="username"
                    type="text"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    autoComplete='off'
                    required
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button disabled={isLoading}>Login</button>
        </form>
    </div>
  )
}
