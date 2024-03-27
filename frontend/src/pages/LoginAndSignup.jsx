import '../styles/loginAndSignup.css'

export default function LoginAndSignup() {
    return (
        <div className="loginAndSignup-card">
            <div className="card-header">
                <div className="log">Welcome Back</div>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input autoComplete='true' required="" name="username" id="username" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input autoComplete='true' required="" name="password" id="password" type="password" />
                </div>
                    <div className="form-group">
                    <input value="Login" type="submit" />
                </div>
            </form>
        </div>

    )
}