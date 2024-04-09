import { useState } from 'react'

export default function AdminDashboard({ setActive, styleActive, styleSubActive }) {
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
                    onClick={() => setActive(p => ({type: "dash", sub: "0", others: null}))}
                    style={styleSubActive("0")}
                >example0</h1>
                <h1
                    onClick={() => setActive(p => ({type: "dash", sub: "1", others: null}))}
                    style={styleSubActive("1")}
                >example1</h1>
                <h1
                    onClick={() => setActive(p => ({type: "dash", sub: "2", others: null}))}
                    style={styleSubActive("2")}
                >example2</h1>
                <h1
                    onClick={() => setActive(p => ({type: "dash", sub: "3", others: null}))}
                    style={styleSubActive("3")}
                >example3</h1>
                <h1
                    onClick={() => setActive(p => ({type: "dash", sub: "4", others: null}))}
                    style={styleSubActive("4")}
                >example4 </h1>
            </div>
            }
        </div>
    )
}
