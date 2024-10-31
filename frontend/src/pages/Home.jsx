import { useEffect, useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"

export default function Home() {
    const { state } = useGlobalContext()

    const [rooms, setRooms] = useState([])
    const [roomLoading, setRoomLoading] = useState(false)

    useEffect(() => {
        fetchRooms()
    }, [state])

    const fetchRooms = async () => {
        setRoomLoading(true)

        const response = await fetch(`${state.uri}/frontpage/accommodations`)
        const json = await response.json()
        setRooms(json.accommodations)

        setRoomLoading(false)
    }

    return (
        <div className="home">
            <div className="page1">
                <img src="images\home.jpg" />
                <h1>CYFRES BEACH RESORT</h1>
                <div className="book-now-cont">
                    <h2>BOOK NOW</h2>
                    <div>
                        <h3>From:</h3>
                        <input type="date" />
                    </div>
                    <div>
                        <h3>To:</h3>
                        <input type="date" />
                    </div>
                </div>
            </div>
            <div className="page2">
                <h1>Discover Comfort in Every Room</h1>
                <div className="images">
                    {roomLoading ?
                        <Loader />
                        :
                        rooms.map(room => (
                            <img key={room._id} src={room.img} />
                        ))
                    }
                </div>
                <div className="arrow">
                    <i className="fa-solid fa-arrow-left-long" />
                    <i className="fa-solid fa-hand-pointer" />
                    <i className="fa-solid fa-arrow-right-long" />
                </div>
                <Link to='/accommodations'>Discover</Link>
            </div>
        </div>
    )
}