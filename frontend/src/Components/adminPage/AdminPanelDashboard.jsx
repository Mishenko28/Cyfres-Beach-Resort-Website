import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'

export default function AdminDashboard({ handleSelected, styleActive, styleSubActive }) {
    const [dashTog, setDashTog] = useState(false)

    return (
        <div className="parent-cont">
            <div
                className="btn"
                onClick={() => setDashTog(!dashTog)}
                style={styleActive(dashTog)}
            >
                <i className="fa-solid fa-chart-line" />
                <h1>Dashboard</h1>
            </div>
            {dashTog &&
            <div className="btn-selections">
                <h1
                    onClick={() => handleSelected("dash", "users")}
                    style={styleSubActive("users")}
                >Users</h1>
                <h1
                    onClick={() => handleSelected("dash", "1")}
                    style={styleSubActive("1")}
                >example1</h1>
                <h1
                    onClick={() => handleSelected("dash", "2")}
                    style={styleSubActive("2")}
                >example2</h1>
                <h1
                    onClick={() => handleSelected("dash", "3")}
                    style={styleSubActive("3")}
                >example3</h1>
                <h1
                    onClick={() => handleSelected("dash", "4")}
                    style={styleSubActive("4")}
                >example4 </h1>
            </div>
            }
        </div>
    )
}
