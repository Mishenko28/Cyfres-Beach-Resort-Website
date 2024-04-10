import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Navigations() {
    const [activeNav, setActiveNav] = useState(null)

    const handleActiveNav = (num) => {
        setActiveNav(num)
    }

    const styleActive = (num) => {
        if (activeNav == num) {
            return window.innerWidth >= 860 ? {boxShadow: 'inset 0 -5px 0 #ff0'
            } : {backgroundColor: '#000'}
        } else {
            return null
        }
    }

    useEffect(() => {
        window.location.pathname == '/' ? setActiveNav(1) : null
        window.location.pathname == '/booking' ? setActiveNav(2) : null
        window.location.pathname == '/accommodations' ? setActiveNav(3) : null
        window.location.pathname == '/amenities' ? setActiveNav(4) : null
        window.location.pathname == '/gallery' ? setActiveNav(5) : null
        window.location.pathname == '/about-us' ? setActiveNav(6) : null
    }, [])

  return (
    <div className="menu-nav-cont">
        <Link to='/' onClick={() => handleActiveNav(1)} style={styleActive(1)}>
            <h6>HOME</h6>
            <i className="fa-solid fa-house" />
        </Link>
        <Link to='/booking' onClick={() => handleActiveNav(2)} style={styleActive(2)}>
            <h6>BOOKING</h6>
            <i className="fa-regular fa-calendar-check" />
        </Link>
        <Link to='/accommodations' onClick={() => handleActiveNav(3)} style={styleActive(3)}>
            <h6>ACCOMMODATIONS</h6>
            <i className="fa-solid fa-bed" />
        </Link>
        <Link to='/amenities' onClick={() => handleActiveNav(4)} style={styleActive(4)}>
            <h6>AMENITIES</h6>
            <i className="fa-solid fa-umbrella-beach" />
        </Link>
        <Link to='/gallery' onClick={() => handleActiveNav(5)} style={styleActive(5)}>
            <h6>GALLERY</h6>
            <i className="fa-solid fa-image" />
        </Link>
        <Link to='/about-us' onClick={() => handleActiveNav(6)} style={styleActive(6)}>
            <h6>ABOUT US</h6>
            <i className="fa-solid fa-users" />
        </Link>
    </div>
  )
}
