import '../styles/navbar.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useState } from 'react'

import Menu from './Menu'
import ProfileDrawer from './ProfileDrawer'

export default function Navbar() {
    const { state, dispatch } = useGlobalContext()

    const [profileTog, setProfileTog] = useState(false)

    const handleProfileTog = () => {
        setProfileTog(!profileTog)
    }

    return (
        <div className="navbar">
            <div className="logo"></div>
            <div className='menu-btn-cont'>
                <Menu />
                {!state.user &&
                <div className='btn-cont'>
                    <Link to='/signup'><button>Signup</button></Link>
                    <Link to='/login'><button>Login</button></Link>
                </div>}
                {state.user &&
                <div className='profile-nav'>
                    <i className="fa-solid fa-cart-flatbed" />
                    <div className='profile-cont'>
                        <i className="fa-solid fa-user" onClick={handleProfileTog}/>
                        {profileTog && <ProfileDrawer state={state} dispatch={dispatch} handleProfileTog={handleProfileTog}/>}
                    </div>
                </div>}
            </div>

        </div>
    )
}