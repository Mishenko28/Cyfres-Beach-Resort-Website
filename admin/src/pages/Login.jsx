import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function Login({ setAdmin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch('https://cyfres-beach-resort-api.onrender.com/admin/login', {
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (response.ok) {
            localStorage.setItem('cyfresAdmin', JSON.stringify(json))
            setAdmin(json.admin)
        } else {
            setError(json.error)
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className="login-body">
                <form onSubmit={handleSubmit}>
                    {isLoading && <div className="loader"></div>}
                    <h1>Welcome to Admin Page</h1>
                    {error && <h2>{error}</h2>}
                    <div>
                        <label>Email:</label>
                        <input
                            autoComplete='on'
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            autoComplete='off'
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={isLoading}>Login</button>
                </form>
            </div>
        </>
    )
}
