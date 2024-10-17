import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function Amenities() {
    const { state } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)
    const [amenities, setAmenities] = useState([])

    useEffect(() => {
        state.user && fetchAllAmenities()
    }, [state])

    const fetchAllAmenities = async () => {
        setIsLoading(true)

        const response = await fetch(`${state.uri}/amenities/all`, {
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }
        })

        const json = await response.json()
        setAmenities(json.amenities)

        setIsLoading(false)
    }

    return (
        <div className="amenities">
            {isLoading ?
                <Loader />
                :
                <div className="amenities-body">
                    {amenities.map(amenity => (
                        <div key={amenity._id} className="amenity">
                            <img src={amenity.img} />
                            <div className="details">
                                <h1>{amenity.accommName}</h1>
                                <h2>{amenity.caption}</h2>
                                <h3>₱{amenity.rate}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}