import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function Configuration() {
    const openNav = useOutletContext()[0]

    return (
        <div className="tab">
            <h1>Configuration</h1>
            {useLocation().pathname === '/configuration' &&
                < div className="cont">
                    <Link onClick={() => openNav(true)} to='/configuration/home'>HOME</Link>
                    <Link onClick={() => openNav(true)} to='/configuration/accommodation'>ACCOMMODATION</Link>
                    <Link onClick={() => openNav(true)} to='/configuration/amenities'>AMENITIES</Link>
                    <Link onClick={() => openNav(true)} to='/configuration/gallery'>GALLERY</Link>
                    <Link onClick={() => openNav(true)} to='/configuration/about-us'>ABOUT US</Link>
                    <Link onClick={() => openNav(true)} to='/configuration/users'>USERS</Link>
                </div>
            }
            <Outlet />
        </div >
    )
}
