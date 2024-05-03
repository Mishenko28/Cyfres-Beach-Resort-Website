import { useEffect, useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import { useNavigate } from "react-router-dom"

export default function Booking() {
    const { state, dispatch } = useGlobalContext()
    const navigate = useNavigate()

    const [dateIn, setDateIn] = useState(new Date().toLocaleDateString('en-CA'))
    const [dateOut, setDateOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA'))
    const totalPeriod = (new Date(dateOut) - new Date(dateIn)) / 86400000
    const [totalAmount, setTotalAmount] = useState(0)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        if (state.user) {
            fetch(`${state.uri}/database/user/details?_id=${state.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
                .then(response => response.json())
                .then(json => json.length == 0 && navigate('/settings/personal-details'))
        } else {
            navigate('/signup')
        }

        const rooms = [
            { _id: 123, name: 'Room 1', max: 3, rate: 1500 },
            { _id: 223, name: 'Room 2', max: 5, rate: 2500 },
            { _id: 323, name: 'Room 3', max: 4, rate: 2000 },
            { _id: 423, name: 'Room 4', max: 1, rate: 1000 }
        ]

        setRooms(rooms.map(room => ({ ...room, isChecked: false })))
    }, [])

    useEffect(() => {
        setTotalAmount(0)
        rooms.map(room => room.isChecked && setTotalAmount(p => p + room.rate))
    }, [rooms])

    const handleDate = (e, type) => {
        if (type == 'in') {
            if (Math.ceil((new Date(e.target.value) - new Date()) / 86400000) >= 0) {
                setDateIn(e.target.value)
                setDateOut(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1)).toLocaleDateString('en-CA'))
            } else {
                setDateIn(new Date().toLocaleDateString('en-CA'))
            }
        } else {
            if (((new Date(e.target.value) - new Date(dateIn)) / 86400000) > 0) {
                setDateOut(e.target.value)
            } else {
                setDateOut(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA'))
            }
        }
    }

    const handleCheckbox = (id) => {
        setRooms(prev => prev.map(room => (room._id == id ? { ...room, isChecked: !room.isChecked } : { ...room })))
    }

    return (
        <div className="booking">
            <form>
                <h1>Reservation Form</h1>
                <div className="note">
                    <h3>Note:</h3>
                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, odio modi? Temporibus ipsa aliquam sint ipsam perferendis labore officia! Rem quia dicta vel, debitis porro voluptatum accusantium sed quae repellat!</h2>
                </div>
                <div className="date">
                    <h3>Check In Date:</h3>
                    <input type="date" value={dateIn} onChange={(e) => handleDate(e, 'in')} />
                    <h3>Check Out Date:</h3>
                    <input type="date" value={dateOut} onChange={(e) => handleDate(e, 'out')} />
                    <div>
                        <h3>Total Period:</h3>
                        {totalPeriod !== 0 &&
                            <h5>{totalPeriod} Day{totalPeriod !== 1 && 's'}</h5>
                        }
                    </div>
                </div>
                <div className="rooms-cont">
                    <h3>Select Room/s</h3>
                    <h4>Total Amount: ₱ {totalAmount}</h4>
                    <h4>Minimum Deposit: ₱ {totalAmount * 0.5}</h4>
                    <div className="rooms">
                        {rooms.map(room => (
                            <div key={room._id} className="room">
                                <input checked={room.isChecked} onChange={() => handleCheckbox(room._id)} type="checkbox" id={room.name} />
                                <label htmlFor={room.name}>{room.name}</label>
                                <h6>Max {room.max} Person{room.max !== 1 && 's'}</h6>
                                <h6>₱ {room.rate}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="req">
                    <h3>Request or Questions?</h3>
                    <textarea />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}