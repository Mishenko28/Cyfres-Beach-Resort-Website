import { useState } from "react"

export default function AdminUtilities({ handleSelected, styleActive, styleSubActive }) {
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
                    onClick={() => handleSelected("util", "10")}
                    style={styleSubActive("10")}
                >example10</h1>
                <h1
                    onClick={() => handleSelected("util", "11")}
                    style={styleSubActive("11")}
                >example11</h1>
                <h1
                    onClick={() => handleSelected("util", "12")}
                    style={styleSubActive("12")}
                >example12</h1>
                <h1
                    onClick={() => handleSelected("util", "13")}
                    style={styleSubActive("13")}
                >example13</h1>
                <h1
                    onClick={() => handleSelected("util", "14")}
                    style={styleSubActive("14")}
                >example14</h1>
            </div>
            }
        </div>
    )
}
