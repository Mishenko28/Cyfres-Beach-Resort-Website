import { NavLink } from "react-router-dom"

export default function Navigations() {
  return (
    <div className="menu-nav-cont">
        <NavLink to='/'>
            <h6>HOME</h6>
            <i className="fa-solid fa-house" />
        </NavLink>
        <hr />
        <NavLink to='/booking'>
            <h6>BOOKING</h6>
            <i className="fa-regular fa-calendar-check" />
        </NavLink>
        <hr />
        <NavLink to='/accommodations'>
            <h6>ACCOMMODATIONS</h6>
            <i className="fa-solid fa-bed" />
        </NavLink>
        <hr />
        <NavLink to='/amenities'>
            <h6>AMENITIES</h6>
            <i className="fa-solid fa-umbrella-beach" />
        </NavLink>
        <hr />
        <NavLink to='/gallery'>
            <h6>GALLERY</h6>
            <i className="fa-solid fa-image" />
        </NavLink>
        <hr />
        <NavLink to='/about-us'>
            <h6>ABOUT US</h6>
            <i className="fa-solid fa-users" />
        </NavLink>
    </div>
  )
}
