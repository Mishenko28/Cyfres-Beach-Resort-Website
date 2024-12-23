import { useEffect, useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"
import { useNavigate } from "react-router-dom"

import Loader from '../components/Loader'

export default function Booking({ setCartNum }) {
    const { state } = useGlobalContext()
    const navigate = useNavigate()

    const [dateIn, setDateIn] = useState(state.date.in)
    const [dateOut, setDateOut] = useState(state.date.out)
    const [question, setQuestion] = useState("")
    const [slctRoom, setSlctRoom] = useState([])

    const [cottages, setCottages] = useState([])
    const [amenities, setAmenities] = useState([])
    const [rooms, setRooms] = useState([])

    const totalPeriod = (new Date(dateOut) - new Date(dateIn)) / 86400000
    const [totalAmount, setTotalAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const [roomImg, setRoomImg] = useState("")

    const [emptyTogg, setEmptyTogg] = useState(false)


    useEffect(() => {
        if (state.user) {
            fetch(`${state.uri}/user/details?_id=${state.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
                .then(response => response.json())
                .then(json => json.length == 0 ? navigate('/settings/personal-details') : fetchAccomms())
                .finally(() => setIsLoading(false))

        } else {
            navigate('/signup')
        }

    }, [])

    useEffect(() => {
        setTotalAmount(0)
        setSlctRoom([])

        rooms.map(room => room.isChecked && setTotalAmount(p => p + (totalPeriod * (room.rate + (room.add * room.addPersonRate)))))
        cottages.map(cottage => cottage.isChecked && setTotalAmount(p => p + (totalPeriod * cottage.rate)))
        amenities.map(amenity => amenity.isChecked && setTotalAmount(p => p + amenity.rate))

        rooms.map(room => room.isChecked && setSlctRoom(p => [...p, room]))
        cottages.map(cottage => cottage.isChecked && setSlctRoom(p => [...p, cottage]))
        amenities.map(amenity => amenity.isChecked && setSlctRoom(p => [...p, amenity]))
    }, [rooms, cottages, amenities, dateIn, dateOut])

    const fetchAccomms = async () => {
        const response1 = await fetch(`${state.uri}/accommodation/all`, {
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }
        })
        const response2 = await fetch(`${state.uri}/amenities/all`, {
            headers: {
                Authorization: `Bearer ${state.user.token}`
            }
        })

        const json1 = await response1.json()
        const json2 = await response2.json()

        setRooms(json1.accommodations.map(accomm => accomm.accommType == 'room' ? { ...accomm, isChecked: false, add: 0 } : false))
        setRooms(prev => prev.filter(accomm => accomm !== false))

        setCottages(json1.accommodations.map(accomm => accomm.accommType == 'cottage' ? { ...accomm, isChecked: false, add: 0 } : false))
        setCottages(prev => prev.filter(accomm => accomm !== false))

        setAmenities(json2.amenities.map(amenity => ({ ...amenity, isChecked: false, add: 0 })))
    }

    const handleDate = (e, type) => {
        if (type == 'in') {
            // dateIn 
            if (Math.ceil((new Date(e.target.value) - new Date()) / 86400000) >= 0) {
                setDateIn(e.target.value)
                setDateOut(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1)).toLocaleDateString('en-CA'))
            } else {
                setDateIn(new Date().toLocaleDateString('en-CA'))
            }
        } else {
            // dateOut
            if (new Date(e.target.value) > new Date(dateIn)) {
                setDateOut(e.target.value)
            } else {
                setDateOut(new Date(dateIn).setDate(new Date(dateIn).getDate() + 1).toLocaleDateString('en-CA'))
            }
        }
    }

    const handleCheckbox = (id) => {
        setRooms(prev => prev.map(room => (room._id == id ? { ...room, isChecked: !room.isChecked } : { ...room })))
        setCottages(prev => prev.map(cottage => (cottage._id == id ? { ...cottage, isChecked: !cottage.isChecked } : { ...cottage })))
        setAmenities(prev => prev.map(amenity => (amenity._id == id ? { ...amenity, isChecked: !amenity.isChecked } : { ...amenity })))

        setRooms(prev => prev.map(room => (room._id == id ? { ...room, add: 0 } : { ...room })))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const selected = slctRoom.map(({ isChecked, ...rest }) => rest)

        if (!slctRoom.some(item => item.accommType == 'room' || item.accommType == 'cottage')) {
            setEmptyTogg(true)
            return
        }

        setIsLoading(true)

        const fetchAddBook = async () => {
            await fetch(`${state.uri}/book/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.user.token}`
                },
                body: JSON.stringify({ _id: state.user._id, total: totalAmount, dateIn, dateOut, question, selected })
            })

            const response = await fetch(`${state.uri}/book/get?_id=${state.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })

            const json = await response.json()

            setCartNum(json.books.length)

            setRooms(rooms.map(room => ({ ...room, isChecked: false })))
            setCottages(cottages.map(cottage => ({ ...cottage, isChecked: false })))
            setAmenities(amenities.map(amenity => ({ ...amenity, isChecked: false })))
            setQuestion("")
            setIsLoading(false)
        }
        fetchAddBook()
    }

    const handleAddPerson = (e, type, _id) => {
        e.preventDefault()
        type == 'add' && setRooms(rooms.map(room => (room._id == _id ? { ...room, add: room.add + 1 } : { ...room })))
        type == 'remove' && setRooms(rooms.map(room => (room._id == _id ? { ...room, add: Math.max(0, room.add - 1) } : { ...room })))
    }

    return (
        <div className="booking">
            {isLoading ?
                <Loader />
                :
                <>
                    {roomImg &&
                        <div className="img">
                            <div>
                                <i onClick={() => setRoomImg(null)} className="fa-solid fa-square-xmark" />
                                <img src={roomImg.img} />
                                <h1>{roomImg.accommName}</h1>
                            </div>
                        </div>
                    }
                    <form>
                        <h1>Reservation Form</h1>
                        <div className="note">
                            <h3>Note:</h3>
                            <h2>
                                To ensure a secure booking system for All guest, Cyfres Beach Resort
                                request for a minimum of 50% down payment to help us gurantee the availability
                                of your room/s. Our team will contact you within 24 hours to process your
                                request. We appreciate your understanding and We are happy to assist you!
                            </h2>
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
                        <div style={emptyTogg ? { border: '1px solid #f00' } : null} className="rooms-cont">
                            <h3>Rooms</h3>
                            <h4>Total Amount:<p>₱{totalAmount}</p></h4>
                            <h4>Minimum Deposit:<p>₱{totalAmount * 0.5}</p></h4>
                            <div className="rooms">
                                {rooms.map(room => (
                                    <div key={room._id}>
                                        <div className="room">
                                            <input checked={room.isChecked} onChange={() => handleCheckbox(room._id)} type="checkbox" id={room.accommName} />
                                            <label htmlFor={room.accommName}>{room.accommName}</label>
                                            <h6>Max {room.maxPerson} Person{room.maxPerson !== 1 && 's'}</h6>
                                            <h6>₱ {room.rate}</h6>
                                            <i onClick={() => setRoomImg(room)} className="fa-solid fa-image" />
                                        </div>
                                        {room.isChecked &&
                                            <div className="add">
                                                <div className="txt">
                                                    <p>Add Person ₱{room.addPersonRate}:</p>
                                                    <p className="value">{room.add == 0 ? 'none' : room.add}</p>
                                                </div>
                                                <div className="bttns">
                                                    <button onClick={(e) => handleAddPerson(e, 'add', room._id)}>+</button>
                                                    <button onClick={(e) => handleAddPerson(e, 'remove', room._id)}>-</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            <h3>Cottages</h3>
                            <div className="rooms">
                                {cottages.map(room => (
                                    <div key={room._id} className="room">
                                        <input checked={room.isChecked} onChange={() => handleCheckbox(room._id)} type="checkbox" id={room.accommName} />
                                        <label htmlFor={room.accommName}>{room.accommName}</label>
                                        <h6>₱ {room.rate}</h6>
                                        <i onClick={() => setRoomImg(room)} className="fa-solid fa-image" />
                                    </div>
                                ))}
                            </div>
                            <h3>Amenities</h3>
                            <div className="rooms">
                                {amenities.map(room => (
                                    <div key={room._id} className="room">
                                        <input checked={room.isChecked} onChange={() => handleCheckbox(room._id)} type="checkbox" id={room.accommName} />
                                        <label htmlFor={room.accommName}>{room.accommName}</label>
                                        <h6>₱ {room.rate}</h6>
                                        <i onClick={() => setRoomImg(room)} className="fa-solid fa-image" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="req">
                            <h3>Request or Questions?</h3>
                            <textarea placeholder="Optional" onChange={(e) => setQuestion(e.target.value)} value={question} />
                        </div>
                        <button onClick={handleSubmit} className="submit">Submit</button>
                    </form>
                </>
            }
        </div>
    )
}