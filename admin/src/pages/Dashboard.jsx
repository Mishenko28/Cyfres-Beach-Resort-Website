import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function Dashboard() {
    const openNav = useOutletContext()[1]

    return (
        <div className="tab">
            <h1>Dashboard</h1>
            {useLocation().pathname === '/dashboard' &&
                < div className="cont">
                    <Link onClick={() => openNav(true)} to='/dashboard/reservation'>RESERVATION</Link>
                    <Link onClick={() => openNav(true)} to='/dashboard/reports'>REPORTS</Link>
                </div>
            }
            <Outlet />
        </div >
    )
}
