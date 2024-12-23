import { useState, useEffect } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"

export default function Accommodations() {
    const { state } = useGlobalContext()

    const [accomms, setAccomms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAllAccomm()
    }, [state])

    const fetchAllAccomm = async () => {
        setIsLoading(true)

        const response = await fetch(`${state.uri}/frontpage/accommodations`)
        const json = await response.json()
        setAccomms(json.accommodations)

        setIsLoading(false)
    }

    return (
        <div className="accommodations">
            {isLoading ?
                <Loader />
                :
                <div className="accomms">
                    {accomms.map(accomm => (
                        <div key={accomm._id} className="accomm">
                            <img src={accomm.img} />
                            <div className="details">
                                <h1>{accomm.accommName}</h1>
                                <h2>{accomm.caption}</h2>
                                <h3>₱{accomm.rate}</h3>
                                <Link to='/booking'><button>BOOK NOW</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}