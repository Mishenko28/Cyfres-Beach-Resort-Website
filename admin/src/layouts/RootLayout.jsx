import { Outlet, NavLink } from 'react-router-dom'

export default function RootLayout({ admin, setAdmin }) {

    const handleLogout = () => {
        localStorage.removeItem('cyfresAdmin')
        setAdmin(null)
    }

    return (
        <div className='app'>
            <div className="navigation">
                <div className="top">
                    <img src="/cyfresLogo.jpg" />
                    <h2>{admin.admin}</h2>
                </div>
                <div className="navs">
                    <NavLink to='dashboard'><h2>Dashboard</h2><i className="fa-solid fa-chart-line" /></NavLink>
                    <NavLink to='configuration'><h2>Configuration</h2><i className="fa-solid fa-wrench" /></NavLink>
                    <NavLink to='utilities'><h2>Utilities</h2><i className="fa-solid fa-user-gear" /></NavLink>
                    <NavLink to='settings'><h2>Settings</h2><i className="fa-solid fa-gear" /></NavLink>
                </div>
                <div className='bottom'>
                    <button onClick={handleLogout}>Logout<i className="fa-solid fa-right-from-bracket" /></button>
                </div>
            </div>
            <div className="body">
                <Outlet />
            </div>
        </div>
    )
}
