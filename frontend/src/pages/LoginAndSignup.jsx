import '../styles/loginAndSignup.css'

export default function LoginAndSignup({ type }) {
    

    return (
        <div className="loginAndSignup-card">
            <div className="card-header">
                <div className="log">{type == 'login' ? "Welcome Back" : "Create Account"}</div>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input
                        autoComplete='true'
                        required
                        id="username"
                        type="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        autoComplete='true'
                        required
                        id="password"
                        type="password"
                    />
                </div>
                <div className="form-group">
                    <button>{type == 'login' ? "Login" : "Signup"}</button>
                </div>
            </form>
        </div>

    )
}