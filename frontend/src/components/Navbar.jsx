import { Link, Outlet } from 'react-router-dom'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import Menu from './Menu'
import ProfileDrawer from './ProfileDrawer'

export default function Navbar({ cartNum }) {
    const { state } = useGlobalContext()

    const [profileTog, setProfileTog] = useState(false)
    const profileRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current !== null) {
                if (state.user && e.target !== profileRef.current && !profileRef.current.contains(e.target)) {
                    setProfileTog(false)
                }
            }
        }

        window.addEventListener('click', handler)

        return () => {
            window.removeEventListener('click', handler)
        }
    }, [])

    const handleProfileTog = () => {
        setProfileTog(!profileTog)
    }

    return (
        <>
            <div className="navbar">
                <img className="logo" src='/images/cyfresLogo.jpg' />
                <div className='menu-btn-cont'>
                    <Menu />
                    {!state.user &&
                        <div className='btn-cont'>
                            <Link to='/signup'><button>Signup</button></Link>
                            <Link to='/login'><button>Login</button></Link>
                        </div>}
                    {state.user &&
                        <div className='profile-nav'>
                            <Link to='cart'>
                                <i className="fa-solid fa-cart-flatbed" />
                                {cartNum > 0 && <h6 className='cart-num'>{cartNum}</h6>}
                            </Link>
                            <div ref={profileRef} className='profile-cont'>
                                <i className="fa-solid fa-user" onClick={handleProfileTog} />
                                <CSSTransition
                                    in={profileTog}
                                    timeout={300}
                                    classNames='profile-transition'
                                    unmountOnExit
                                >
                                    <ProfileDrawer handleProfileTog={handleProfileTog} />
                                </CSSTransition>
                            </div>
                        </div>}
                </div>
            </div>
            <Outlet />
        </>
    )
}