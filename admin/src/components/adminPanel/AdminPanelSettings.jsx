import { useState } from "react"

export default function AdminSettings({ setActive, styleActive, styleSubActive }) {
    const [settTog, setSettTog] = useState(false)

    return (
        <div className="parent-cont">
            <div
                className="btn"
                onClick={() => setSettTog(!settTog)}
                style={styleActive(settTog)}
            >
                <i className="fa-solid fa-gear" />
                <h1>Settings</h1>
            </div>
            {settTog &&
            <div className="btn-selections">
                <h1
                    onClick={() => setActive(p => ({type: "sett", sub: "15", others: null}))}
                    style={styleSubActive("15")}
                >example10</h1>
                <h1
                    onClick={() => setActive(p => ({type: "sett", sub: "16", others: null}))}
                    style={styleSubActive("16")}
                >example11</h1>
                <h1
                    onClick={() => setActive(p => ({type: "sett", sub: "17", others: null}))}
                    style={styleSubActive("17")}
                >example12</h1>
                <h1
                    onClick={() => setActive(p => ({type: "sett", sub: "18", others: null}))}
                    style={styleSubActive("18")}
                >example13</h1>
                <h1
                    onClick={() => setActive(p => ({type: "sett", sub: "19", others: null}))}
                    style={styleSubActive("19")}
                >example14</h1>
            </div>
            }
        </div>
    )
}
