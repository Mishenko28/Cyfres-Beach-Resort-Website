import { useState } from "react"
import useAdmin from "../hooks/useAdmin"

export default function Login() {
    const [email, setEmail] = useState('thomas28')
    const [password, setPassword] = useState('thomas1228')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAdmin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch('http://localhost:5000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "LOGIN", payload: json })
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
                            type="text"
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
