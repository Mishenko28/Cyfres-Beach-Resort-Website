import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'

export default function RootLayout() {
    const [dashboardChildNavs, setDashboardChildNavs] = useState(false)
    const [utilitiesChildNavs, setUtilitiesChildNavs] = useState(false)
    const [settingsChildNavs, setSettingsChildNavs] = useState(false)
    const [confiurationChildNavs, setConfigurationChildNavs] = useState(false)

    const { state, dispatch } = useAdmin()

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className='app'>
            <div className="navigation">
                <div className="top">
                    <img src="/cyfresLogo.jpg" />
                    <h1>{state.admin.email}</h1>
                </div>
                <hr />
                <div className="navs">
                    <NavLink className="main" to='dashboard' onClick={() => setDashboardChildNavs(!dashboardChildNavs)}><h2>Dashboard</h2><i className="fa-solid fa-chart-line" /></NavLink>
                    {dashboardChildNavs &&
                        <div>
                            <NavLink to='dashboard/reservation'>Reservation</NavLink>
                            <NavLink to='dashboard/reports'>Reports</NavLink>
                        </div>
                    }
                    <NavLink className="main" to='configuration' onClick={() => setConfigurationChildNavs(!confiurationChildNavs)}><h2>Configuration</h2><i className="fa-solid fa-wrench" /></NavLink>
                    {confiurationChildNavs &&
                        <div>
                            <NavLink to='configuration/home'>Home</NavLink>
                            <NavLink to='configuration/accommodation'>Accommodation</NavLink>
                            <NavLink to='configuration/amenities'>Amenities</NavLink>
                            <NavLink to='configuration/gallery'>Gallery</NavLink>
                            <NavLink to='configuration/about-us'>About us</NavLink>
                            <NavLink to='configuration/users'>Users</NavLink>
                        </div>
                    }
                    <NavLink className="main" to='utilities' onClick={() => setUtilitiesChildNavs(!utilitiesChildNavs)}><h2>Utilities</h2><i className="fa-solid fa-user-gear" /></NavLink>
                    {utilitiesChildNavs &&
                        <div>
                            <NavLink to='utilities/admin'>Admin</NavLink>
                            <NavLink to='utilities/archive'>Archive</NavLink>
                            <NavLink to='utilities/activity-logs'>Activity Logs</NavLink>
                            <NavLink to='utilities/backup-and-reset'>Backup & Resets</NavLink>
                        </div>
                    }
                    <NavLink className="main" to='settings' onClick={() => setSettingsChildNavs(!settingsChildNavs)}><h2>Settings</h2><i className="fa-solid fa-gear" /></NavLink>
                    {settingsChildNavs &&
                        <div>
                            <NavLink to='settings/profile'>Profile</NavLink>
                        </div>
                    }
                </div>
                <div className='bottom'>
                    <button onClick={handleLogout}>Logout<i className="fa-solid fa-right-from-bracket" /></button>
                </div>
            </div>
            <div className="body">
                <Outlet context={[setConfigurationChildNavs, setDashboardChildNavs, setSettingsChildNavs, setUtilitiesChildNavs]} />
            </div>
        </div>
    )
}
