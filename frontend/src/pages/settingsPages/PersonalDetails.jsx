import { useEffect, useRef, useState } from "react"

export default function PersonalDetails() {
    const [name, setName] = useState("John Thomas T. Alog")
    const [age, setAge] = useState(23)
    const [sex, setSex] = useState("Male")
    const [address, setAddress] = useState("Barrangay Dimakita")
    const [contact, setContact] = useState("09488457315")

    const [sexTogg, setSexTogg] = useState(false)
    const sexRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (!sexRef.current.contains(e.target)) {
                setSexTogg(false)
            }
        }

        window.addEventListener('click', handler)

        return () => {
            window.removeEventListener('click', handler)
        }
    }, [])

    return (
        <form className="details">
            <div>
                <h2>Name</h2>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
            </div>
            <div>
                <h2>Age</h2>
                <input onChange={(e) => setAge(e.target.value)} value={age} type="number" />
            </div>
            <div>
                <h2>Sex</h2>
                <div ref={sexRef} className="sex">
                    <h3 style={sexTogg ? { boxShadow: "inset 0 0 0 1px #000" } : null} onClick={() => setSexTogg(!sexTogg)}>{sex}</h3>
                    {sexTogg &&
                        <div className="sex-dropdown">
                            <h4 onClick={() => setSex("Male")}>Male</h4>
                            <hr />
                            <h4 onClick={() => setSex("Female")}>Female</h4>
                        </div>
                    }
                </div>
            </div>
            <div>
                <h2>Address</h2>
                <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" />
            </div>
            <div>
                <h2>Contact Number</h2>
                <input onChange={(e) => setContact(e.target.value)} value={contact} type="tel" />
            </div>
            <button>Save</button>
        </form>
    )
}
