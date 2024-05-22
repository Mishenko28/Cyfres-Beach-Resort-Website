import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function Settings() {
    const openNav = useOutletContext()[2]

    return (
        <div className="tab">
            <h1>Settings</h1>
            {useLocation().pathname === '/settings' &&
                < div className="cont">
                    <Link onClick={() => openNav(true)} to='/settings/profile'>PROFILE</Link>
                </div>
            }
            <Outlet />
        </div >
    )
}
