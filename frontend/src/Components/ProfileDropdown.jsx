import '../styles/profileDropdown.css'
import { Link } from 'react-router-dom'

export default function ProfileDropdown({ state, dispatch }) {
    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="profile-dropdown">
            <h1>{state.user.email}</h1>
            <div className='btns'>
                <button>Sample Btn</button>
                <Link to='/login'><button onClick={handleLogout}>Logout</button></Link>
            </div>
        </div>
    )
}