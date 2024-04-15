import { Link, Outlet } from 'react-router-dom'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import Menu from './Menu'
import ProfileDrawer from './ProfileDrawer'

export default function Navbar() {
    const { state, dispatch } = useGlobalContext()
    const profileDrawerRef = useRef(null)

    const [profileTog, setProfileTog] = useState(false)

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
                            <i className="fa-solid fa-cart-flatbed" />
                            <div className='profile-cont'>
                                <i className="fa-solid fa-user" onClick={handleProfileTog} />
                                <CSSTransition
                                    in={profileTog}
                                    timeout={300}
                                    classNames='profile-transition'
                                    nodeRef={profileDrawerRef}
                                    unmountOnExit
                                >
                                    <ProfileDrawer forwardRef={profileDrawerRef} state={state} dispatch={dispatch} handleProfileTog={handleProfileTog} />
                                </CSSTransition>
                            </div>
                        </div>}
                </div>
            </div>
            <Outlet />
        </>
    )
}