import { useEffect, useState } from 'react'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { Link, Navigate } from 'react-router-dom'

export default function LoginAndSignup({ type }) {
    const { state, dispatch } = useGlobalContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setError("")
    }, [type])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (type == 'signup' && password !== confirmPassword) {
            setError("Password dont match")
            setIsLoading(false)
            return
        }

        const response = await fetch('https://cyfres-beach-resort-api.onrender.com/auth/' + type, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } else {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
        }

        setIsLoading(false)
    }

    if (state.user) {
        return <Navigate to='/' />
    }

    return (
        <div className='loginAndSignup-card'>
            <form onSubmit={handleSubmit}>
                {isLoading && <div className="loader"></div>}
                <Link className='back' to='/'><i className="fa-solid fa-circle-xmark" /></Link>
                <h1>{type == 'login' ? "Welcome Back" : "Create Account"}</h1>
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
                    {type == 'signup' &&
                        <>
                            <label>Confirm Password:</label>
                            <input
                                autoComplete='off'
                                required
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </>
                    }
                </div>
                <button style={type == 'login' ? { backgroundColor: '#4991d9' } : { backgroundColor: '#28cf89' }} disabled={isLoading}>{type == 'login' ? "Login" : "Signup"}</button>
                {type == 'signup' &&
                    <>
                        <hr />
                        <h4>Already have an Account?</h4>
                        <Link to='/login'><button disabled={isLoading} >Login</button></Link>
                    </>
                }
                {type == 'login' && <h3>Do not have an Account? <Link to={isLoading ? '/login' : '/signup'}>Create one</Link></h3>}
            </form>
        </div>
    )
}