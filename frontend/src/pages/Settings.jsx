import { NavLink, Outlet, useLocation } from "react-router-dom"

export default function Settings() {
    const location = useLocation()
    const pathname = location.pathname.split('/')[2]

    return (
        <div className="settings">
            <h1>SETTINGS</h1>
            <NavLink to='personal-details'><i className="fa-solid fa-angle-right" />Personal Details</NavLink>
            {pathname == 'personal-details' && <Outlet />}
            <NavLink to='account'><i className="fa-solid fa-angle-right" />Account</NavLink>
            {pathname == 'account' && <Outlet />}
        </div>
    )
}
