import { useState } from "react"

export default function AdminUtilities({ setActive, styleActive, styleSubActive }) {
    const [utilTog, setUtilTog] = useState(false)

    return (
        <div className="parent-cont">
            <div
                className="btn"
                onClick={() => setUtilTog(!utilTog)}
                style={styleActive(utilTog)}
            >
                <i className="fa-solid fa-gears" />
                <h1>Utilities</h1>
            </div>
            {utilTog &&
            <div className="btn-selections">
                <h1
                    onClick={() => setActive(p => ({type: "util", sub: "10", others: null}))}
                    style={styleSubActive("10")}
                >example10</h1>
                <h1
                    onClick={() => setActive(p => ({type: "util", sub: "11", others: null}))}
                    style={styleSubActive("11")}
                >example11</h1>
                <h1
                    onClick={() => setActive(p => ({type: "util", sub: "12", others: null}))}
                    style={styleSubActive("12")}
                >example12</h1>
                <h1
                    onClick={() => setActive(p => ({type: "util", sub: "13", others: null}))}
                    style={styleSubActive("13")}
                >example13</h1>
                <h1
                    onClick={() => setActive(p => ({type: "util", sub: "14", others: null}))}
                    style={styleSubActive("14")}
                >example14</h1>
            </div>
            }
        </div>
    )
}
