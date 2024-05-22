import { useEffect, useRef, useState } from "react"
import { useGlobalContext } from "../../hooks/useGlobalContext"

import Loader from "../../components/Loader"

export default function PersonalDetails() {
    const { state } = useGlobalContext()

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [userDetails, setUserDetails] = useState([])
    const [saveTogg, setSaveTogg] = useState(false)
    const [emptyTogg, setEmptyTogg] = useState(false)

    const [sexTogg, setSexTogg] = useState(false)
    const sexRef = useRef()

    useEffect(() => {
        setSaveTogg(false)
        if (userDetails.length == 1) {
            userDetails[0].name !== name && setSaveTogg(true)
            userDetails[0].age !== age && setSaveTogg(true)
            userDetails[0].sex !== sex && setSaveTogg(true)
            userDetails[0].address !== address && setSaveTogg(true)
            userDetails[0].contactNumber !== contact && setSaveTogg(true)
        } else {
            name !== "" && setSaveTogg(true)
            age !== "" && setSaveTogg(true)
            sex !== "" && setSaveTogg(true)
            address !== "" && setSaveTogg(true)
            contact !== "" && setSaveTogg(true)
        }
    }, [name, age, sex, address, contact, userDetails])

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true)
            const response = await fetch(`${state.uri}/user/details?_id=${state.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
            const json = await response.json()

            setUserDetails(json)

            if (json.length == 1) {
                setName(json[0].name)
                setAge(json[0].age)
                setSex(json[0].sex)
                setAddress(json[0].address)
                setContact(json[0].contactNumber)
            }
            setIsLoading(false)
        }
        fetchUserDetails()

    }, [])

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

    const handleSave = (e) => {
        e.preventDefault()

        if (name == "" || age == "" || sex == "" || address == "" || contact == "") {
            setEmptyTogg(true)
            return
        }

        if (userDetails.length == 1) {
            const fetchUpdate = async () => {
                setIsLoading(true)

                const response = await fetch(`${state.uri}/user/details`, {
                    method: 'PATCH',
                    body: JSON.stringify({ _id: state.user._id, name, age, sex, address, contact }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.user.token}`
                    }
                })

                const json = await response.json()

                setUserDetails([json])
                setSaveTogg(false)
                setIsLoading(false)
            }
            fetchUpdate()
        } else {
            const fetchAdd = async () => {
                setIsLoading(true)

                const response = await fetch(`${state.uri}/user/details`, {
                    method: 'POST',
                    body: JSON.stringify({ _id: state.user._id, email: state.user.email, name, age, sex, address, contact }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.user.token}`
                    }
                })

                const json = await response.json()

                setUserDetails([json])
                setSaveTogg(false)
                setIsLoading(false)
            }
            fetchAdd()
        }
    }

    return (
        <form onSubmit={handleSave} className="details">
            {isLoading ?
                <div className="loader"></div>
                :
                <>
                    <div>
                        <h2 className="text">Please fill all the details to continue BOOKING. Make sure the Contact Number is correct</h2>
                    </div>
                    <hr />
                    <div>
                        <div>
                            {emptyTogg && name == "" && <h5>*</h5>}
                            <h2>Name</h2>
                        </div>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
                    </div>
                    <div>
                        <div>
                            {emptyTogg && age == "" && <h5>*</h5>}
                            <h2>Age</h2>
                        </div>
                        <input onChange={(e) => setAge(parseInt(e.target.value) || "")} value={age} type="number" />
                    </div>
                    <div>
                        <div>
                            {emptyTogg && sex == "" && <h5>*</h5>}
                            <h2>Sex</h2>
                        </div>
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
                        <div>
                            {emptyTogg && address == "" && <h5>*</h5>}
                            <h2>Address</h2>
                        </div>
                        <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" />
                    </div>
                    <div>
                        <div>
                            {emptyTogg && contact == "" && <h5>*</h5>}
                            <h2>Contact Number</h2>
                        </div>
                        <div>
                            <h6>+63</h6>
                            <input className="contact" onChange={(e) => setContact(parseInt(e.target.value) || "")} value={contact} type="tel" />
                        </div>
                    </div>
                    {saveTogg &&
                        <button>Save</button>
                    }
                </>
            }
        </form>
    )
}
