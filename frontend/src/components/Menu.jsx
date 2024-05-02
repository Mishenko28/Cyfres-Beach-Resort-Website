import Navigations from "./Navigations"
import MenuBtn from "./MenuBtn"
import { useEffect, useState } from "react"

export default function Menu() {
    const [navTog, setNavTog] = useState(false)
    const [checked, setChecked] = useState(false)

    const handleNavTog = () => {
        setNavTog(!navTog)
        setChecked(!checked)
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

        if (window.innerWidth >= 860) {
            setNavTog(true)
        } else {
            setNavTog(false)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    return (
        <div className="menu">
            <MenuBtn handleNavTog={handleNavTog} checked={checked} />
            {navTog && <Navigations handleNavTog={handleNavTog} />}
        </div>
    )
}
