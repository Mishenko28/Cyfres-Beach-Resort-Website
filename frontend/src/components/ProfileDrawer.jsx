import { Link, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function ProfileDrawer({ handleProfileTog }) {
    const { state, dispatch } = useGlobalContext()
    const navigate = useNavigate()

    const handleLogout = () => {
        handleProfileTog()
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" })
        navigate('/login')
    }

    return (
        <div className='navs'>
            <div className='top'>
                <i className="fa-solid fa-angle-right" onClick={handleProfileTog} />
                <div className='profile-pic'>
                    <i className="fa-solid fa-user-large" />
                </div>
                <h5>{state.user.email}</h5>
            </div>
            <Link to='/booking' className='nav' onClick={() => handleProfileTog(false)}>
                <h6>Book Now</h6>
                <i className="fa-regular fa-calendar-check" />
            </Link>
            <Link to='/settings' className='nav' onClick={() => handleProfileTog(false)}>
                <h6>Settings</h6>
                <i className="fa-solid fa-user-pen" />
            </Link>
            <div className='nav' onClick={handleLogout}>
                <h6>Logout</h6>
                <i className="fa-solid fa-right-from-bracket" />
            </div>
        </div>
    )
}
