import '../styles/navbar.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useEffect, useRef, useState } from 'react'

import ProfileDropdown from './ProfileDropdown'

export default function Navbar() {
    const { state, dispatch } = useGlobalContext()
    const profileDropdownRef = useRef(null)

    const [profileDropdown, setProfileDropdown] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
            setProfileDropdown(false)
          }
        }
    
        document.addEventListener('click', handleClickOutside)
    
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setProfileDropdown(false)
    }, [state])

    const handleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown)
    }

    return (
        <div className="navbar">
            <div className='logo-auth'>
                <div className="logo"></div>
                {!state.user &&
                    <ul className='auth'>
                        <Link to={'/login'}><li>Login</li></Link>
                        <hr />
                        <Link to={'/signup'}><li>Signup</li></Link>
                    </ul>
                }
                {state.user &&
                    <div className='profile'>
                        <i className="fa-solid fa-cart-flatbed" />
                        <div ref={profileDropdownRef}>
                            <i className="fa-solid fa-user" onClick={handleProfileDropdown}/>
                            {profileDropdown && <ProfileDropdown state={state} dispatch={dispatch}/>}
                        </div>
                    </div>
                }
            </div>
            <ul className='nav'>
                <Link to='/'><li>HOME</li></Link>
                <Link to='/booking'><li>BOOKING</li></Link>
                <Link to='/accomodations'><li>ACCOMODATIONS</li></Link>
                <Link to='/amenities'><li>AMENITIES</li></Link>
                <Link to='/gallery'><li>GALLERY</li></Link>
            </ul>
        </div>
    )
}