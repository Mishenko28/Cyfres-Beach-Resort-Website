import { useEffect, useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import Loader from "../components/Loader"
import { Link, useNavigate } from "react-router-dom"

export default function Home() {
    const { state, dispatch } = useGlobalContext()
    const navigate = useNavigate()

    const [rooms, setRooms] = useState([])
    const [roomLoading, setRoomLoading] = useState(false)

    const [date, setDate] = useState({ ...state.date })


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

    const handleDataIn = (e) => {
        const currentDate = new Date().toISOString().split('T')[0]

        if (e.target.value >= currentDate) {
            setDate({ in: e.target.value, out: new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1)).toISOString().split('T')[0] })
        } else {
            setDate(prev => ({ ...prev, in: new Date().toISOString().split('T')[0] }))
        }
    }

    const handleDataOut = (e) => {
        if (e.target.value <= date.in) {
            setDate(prev => ({ ...prev, out: new Date(new Date(date.in).setDate(new Date(date.in).getDate() + 1)).toISOString().split('T')[0] }))
        } else {
            setDate(prev => ({ ...prev, out: e.target.value }))
        }
    }

    const handleBookNow = () => {
        dispatch({ type: "DATE", payload: date })
        navigate('/booking')
    }

    return (
        <div className="home">
            <div className="page1">
                <img src="images\home.jpg" />
                <h1>CYFRES BEACH RESORT</h1>
                <div className="book-now-cont">
                    <h2 onClick={handleBookNow}>BOOK NOW</h2>
                    <div>
                        <h3>From:</h3>
                        <input value={date.in} onChange={handleDataIn} type="date" />
                    </div>
                    <div>
                        <h3>To:</h3>
                        <input value={date.out} onChange={handleDataOut} type="date" />
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