import { useState } from "react"

export default function AdminConfiguration({ handleSelected, styleActive, styleSubActive }) {
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
                    onClick={() => handleSelected("config", "5")}
                    style={styleSubActive("5")}
                >example5</h1>
                <h1
                    onClick={() => handleSelected("config", "6")}
                    style={styleSubActive("6")}
                >example6</h1>
                <h1
                    onClick={() => handleSelected("config", "7")}
                    style={styleSubActive("7")}
                >example7</h1>
                <h1
                    onClick={() => handleSelected("config", "8")}
                    style={styleSubActive("8")}
                >example8</h1>
                <h1
                    onClick={() => handleSelected("config", "9")}
                    style={styleSubActive("9")}
                >example9</h1>
            </div>
            }
        </div>
    )
}
