import React from 'react'

export default function ProfileDrawer({ state, dispatch, handleProfileTog }) {

    const handleLogout = () => {
        handleProfileTog()
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT"})
        window.location.pathname = '/login'
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
            <div className='nav'>
                <h6>User Settings</h6>
                <i className="fa-solid fa-user-pen" />
            </div>
            <div className='nav'>
                <h6>Book Now</h6>
                <i className="fa-regular fa-calendar-check" />
            </div>
            <div className='nav' onClick={handleLogout}>
                <h6>Logout</h6>
                <i className="fa-solid fa-right-from-bracket" />
            </div>
        </div>
  )
}
