import { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'

export default function LoginAndSignup({ type }) {
    const { dispatch } = useGlobalContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setError("")
    }, [type])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch('http://localhost:5000/auth/' + type, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } else {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
        }
        setIsLoading(false)
    }

    return (
        <div className="loginAndSignup-card">
            <div className="card-header">
                <div className="log">{type == 'login' ? "Welcome Back" : "Create Account"}</div>
                {error && <div className='error'>{error}</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input
                        autoComplete='true'
                        required
                        id="username"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        autoComplete='true'
                        required
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button disabled={isLoading}>{type == 'login' ? "Login" : "Signup"}</button>
                </div>
            </form>
        </div>

    )
}