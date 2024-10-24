import { useState, useEffect } from "react"
import Loader from "../components/Loader"
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function Gallery() {
    const { state } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        fetchGalley()
    }, [state])

    const fetchGalley = async () => {
        setIsLoading(true)

        const response = await fetch(`${state.uri}/frontpage/galleries`)
        const json = await response.json()
        setPictures(json.galleries)

        setIsLoading(false)
    }

    return (
        <div className="gallery">
            {isLoading ?
                <Loader />
                :
                <div className="gallery-body">
                    {pictures.map(picture => (
                        <div className="picture" key={picture._id}>
                            <img src={picture.img} />
                            <h1>{picture.caption}</h1>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}