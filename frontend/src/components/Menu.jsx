import Navigations from "./Navigations"
import MenuBtn from "./MenuBtn"
import { useEffect, useRef, useState } from "react"

export default function Menu() {
    const [navTog, setNavTog] = useState(false)
    const [checked, setChecked] = useState(false)
    const menuRef = useRef()

    const handleNavTog = () => {
        if (window.innerWidth <= 860) {
            setNavTog(!navTog)
            setChecked(!checked)
        }
    }

    useEffect(() => {
        const handleResize = (e) => {
            if (e.target.innerWidth >= 860) {
                setNavTog(true)
            } else {
                setNavTog(false)
                setChecked(false)
            }
        }

        const handleClick = (e) => {
            if (menuRef.current !== e.target && !menuRef.current.contains(e.target)) {
                if (window.innerWidth <= 860) {
                    setNavTog(false)
                    setChecked(false)
                }
            }
        }

        if (window.innerWidth >= 860) {
            setNavTog(true)
        } else {
            setNavTog(false)
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('click', handleClick)
        }
    }, [])
    
    return (
        <div ref={menuRef} className="menu">
            <MenuBtn handleNavTog={handleNavTog} checked={checked} />
            {navTog && <Navigations handleNavTog={handleNavTog} />}
        </div>
    )
}