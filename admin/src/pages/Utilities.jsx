import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function Utilities() {
    const openNav = useOutletContext()[3]

    return (
        <div className="tab">
            <h1>UTILITIES</h1>
            {useLocation().pathname === '/utilities' &&
                < div className="cont">
                    <Link onClick={() => openNav(true)} to='/utilities/admin'>ADMIN</Link>
                    <Link onClick={() => openNav(true)} to='/utilities/archive'>ARCHIVE</Link>
                    <Link onClick={() => openNav(true)} to='/utilities/activity-logs'>ACTIVITY LOGS</Link>
                    <Link onClick={() => openNav(true)} to='/utilities/backup-and-reset'>BACKUP & RESET</Link>
                </div>
            }
            <Outlet />
        </div >
    )
}
