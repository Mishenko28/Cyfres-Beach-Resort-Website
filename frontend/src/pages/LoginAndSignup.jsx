import { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
import '../styles/loginAndSignup.css'
import { Link } from 'react-router-dom'

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
        <div className='loginAndSignup-card'>
            <form onSubmit={handleSubmit}>
                <h1>{type == 'login' ? "Welcome Back" : "Create Account"}</h1>
                {error && <h2>{error}</h2>}
                <div>
                    <label>Email:</label>
                    <input
                        autoComplete='true'
                        required
                        id="username"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        autoComplete='true'
                        required
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button style={type == 'login' ? {backgroundColor: '#4991d9'} : {backgroundColor: '#28cf89'}} disabled={isLoading}>{type == 'login' ? "Login" : "Signup"}</button>
                {type == 'signup' &&
                <>
                    <hr />
                    <Link to='/login'><button>Login</button></Link>
                </>
                }
                {type == 'login' && <h3>Do not have an Account? <Link to='/signup'>Create one</Link></h3>}
            </form>
        </div>
    )
}