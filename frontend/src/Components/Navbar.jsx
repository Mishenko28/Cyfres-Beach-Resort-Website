import '../styles/navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='logo-auth'>
                <div className="logo"></div>
                <ul className='auth'>
                    <Link to={'/login'}><li>Login</li></Link>
                    <hr />
                    <Link to={'/signup'}><li>Signup</li></Link>
                </ul>
            </div>
            <ul className='nav'>
                <Link to={'/'}><li>HOME</li></Link>
                <li>BOOKING</li>
                <li>ACCOMODATIONS</li>
                <li>AMENITIES</li>
                <li>GALLERY</li>
            </ul>
        </div>
    )
}