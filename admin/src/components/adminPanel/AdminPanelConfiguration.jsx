import { useState } from "react"

export default function AdminConfiguration({ setActive, styleActive, styleSubActive }) {
    const [configTog, setConfigTog] = useState(false)

    return (
        <div className="parent-cont">
            <div
                className="btn"
                onClick={() => setConfigTog(!configTog)}
                style={styleActive(configTog)}
            >
                <i className="fa-solid fa-wrench" />
                <h1>Configuration</h1>
            </div>
            {configTog &&
            <div className="btn-selections">
                <h1
                    onClick={() => setActive(p => ({type: "config", sub: "users", others: null}))}
                    style={styleSubActive("users")}
                >Users</h1>
                <h1
                    onClick={() => setActive(p => ({type: "config", sub: "6", others: null}))}
                    style={styleSubActive("6")}
                >example6</h1>
                <h1
                    onClick={() => setActive(p => ({type: "config", sub: "7", others: null}))}
                    style={styleSubActive("7")}
                >example7</h1>
                <h1
                    onClick={() => setActive(p => ({type: "config", sub: "8", others: null}))}
                    style={styleSubActive("8")}
                >example8</h1>
                <h1
                    onClick={() => setActive(p => ({type: "config", sub: "9", others: null}))}
                    style={styleSubActive("9")}
                >example9</h1>
            </div>
            }
        </div>
    )
}
