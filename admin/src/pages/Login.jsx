import { useState } from "react"

export default function Login({ setAdmin }) {
    const [email, setEmail] = useState('thomas28')
    const [password, setPassword] = useState('thomas1228')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch('https://cyfres-beach-resort-api.onrender.com/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        
        if (response.ok) {
            localStorage.setItem('cyfresAdmin', JSON.stringify(json))
            setAdmin(json)
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
