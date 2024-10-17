import { NavLink } from "react-router-dom"

export default function Navigations({ handleNavTog }) {
    return (
        <div className="menu-nav-cont">
            <NavLink onClick={handleNavTog} to='/'>
                <h6>HOME</h6>
                <i className="fa-solid fa-house" />
            </NavLink>
            <hr />
            <NavLink onClick={handleNavTog} to='/booking'>
                <h6>BOOKING</h6>
                <i className="fa-regular fa-calendar-check" />
            </NavLink>
            <hr />
            <NavLink onClick={handleNavTog} to='/accommodations'>
                <h6>ACCOMMODATIONS</h6>
                <i className="fa-solid fa-bed" />
            </NavLink>
            <hr />
            <NavLink onClick={handleNavTog} to='/amenities'>
                <h6>AMENITIES</h6>
                <i className="fa-solid fa-umbrella-beach" />
            </NavLink>
            <hr />
            <NavLink onClick={handleNavTog} to='/gallery'>
                <h6>GALLERY</h6>
                <i className="fa-solid fa-image" />
            </NavLink>
            <hr />
            <NavLink onClick={handleNavTog} to='/about-us'>
                <h6>ABOUT US</h6>
                <i className="fa-solid fa-users" />
            </NavLink>
        </div>
    )
}
