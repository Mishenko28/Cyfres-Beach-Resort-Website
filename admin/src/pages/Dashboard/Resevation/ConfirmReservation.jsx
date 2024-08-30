import { formatDistance } from "date-fns"
import useAdmin from "../../../hooks/useAdmin"
import { useEffect } from "react"
import { useState } from "react"
import Loader from '../../../components/Loader'

export default function ConfirmReservation({ confirmBook, setConfirmBook, setBooks }) {
    const { state, dispatch } = useAdmin()
    const [accommodations, setAccommodations] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAccomm()
    }, [])

    useEffect(() => {
        handleTotal()
    }, [confirmBook.slctRoom])

    const fetchAccomm = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/accommodation/all`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })

        const json = await response.json()

        setAccommodations(json.accommodations)
        setIsLoading(false)
    }

    const handleConfirmBook = async (book) => {
        setIsLoading(true)
        const { _id, userId, dateIn, dateOut, question, slctRoom, deposit, total } = book

        const response = await fetch(`${state.uri}/book/confirm`, {
            method: "POST",
            body: JSON.stringify({
                _id,
                userId,
                dateIn,
                dateOut,
                question,
                slctRoom,
                deposit,
                total
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.admin.token}`,
            },
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(prev => prev.filter((book) => book._id !== json._id))
        setConfirmBook(null)
        setIsLoading(false)
    }

    const handleToggleRoom = (accomm) => {
        if (confirmBook.slctRoom.some(room => room.accommName == accomm.accommName)) {
            setConfirmBook(prev => ({ ...prev, slctRoom: prev.slctRoom.filter(room => room.accommName !== accomm.accommName) }))
            return
        }
        accomm.add = 0
        setConfirmBook(prev => ({ ...prev, slctRoom: [...prev.slctRoom, accomm] }))
    }

    const handleAddPerson = (e, type, accomm) => {
        e.stopPropagation()

        setConfirmBook(prev => ({ ...prev, slctRoom: prev.slctRoom.map(room => room.accommName == accomm.accommName ? { ...room, add: (type == "+" ? room.add++ : (room.add > 0 ? room.add-- : 0)) } : room) }))
    }

    const handleTotal = () => {
        setConfirmBook(prev => ({ ...prev, total: 0 }))
        setConfirmBook(prev => ({ ...prev, total: prev.slctRoom.reduce((sum, room) => sum + room.rate + (room.add * room.addPersonRate), 0) }))
        setConfirmBook(prev => ({ ...prev, deposit: prev.total * 0.5 }))
    }

    return (
        <div className="blur-cont">
            <div className="edit-cont">
                <h2>Confirm Reservation </h2>
                <div className="edit-div">
                    <p>Date In:</p>
                    <input className="inputs" type="date" onChange={(e) => setConfirmBook(prev => ({ ...prev, dateIn: e.target.value }))} value={new Date(confirmBook.dateIn).toLocaleDateString("en-CA")} />
                </div>
                <div className="edit-div">
                    <p>Date Out: ({formatDistance(confirmBook.dateIn, confirmBook.dateOut)})</p>
                    <input className="inputs" type="date" onChange={(e) => setConfirmBook(prev => ({ ...prev, dateOut: e.target.value }))} value={new Date(confirmBook.dateOut).toLocaleDateString("en-CA")} />
                </div>
                <div className="edit-div">
                    <p>Accommodations:</p>
                    <div className="accomm-inputs">
                        {isLoading ?
                            <Loader />
                            :
                            <>
                                <h2 className="acc-nav">Rooms</h2>
                                <div className="accomm-cont">
                                    {accommodations.map(accomm => accomm.accommType == 'room' && (
                                        <div
                                            className="accomm"
                                            style={confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#002244", color: "#fff" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <h2>rate: {accomm.rate}</h2>
                                            <h2>max: {accomm.maxPerson}</h2>
                                            {confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ?
                                                <>
                                                    <div className="bttns">
                                                        <button onClick={(e) => { handleAddPerson(e, "-", accomm) }}>-</button>
                                                        <button onClick={(e) => { handleAddPerson(e, "+", accomm) }}>+</button>
                                                    </div>
                                                    <h2>add: ({accomm.addPersonRate} * {confirmBook.slctRoom.map(room => room.accommName == accomm.accommName && room.add)})</h2>
                                                </>
                                                :
                                                <h2>add: {accomm.addPersonRate}</h2>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <h2 className="acc-nav">Cottages</h2>
                                <div className="accomm-cont">
                                    {accommodations.map(accomm => accomm.accommType == 'cottage' && (
                                        <div
                                            className="accomm"
                                            style={confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#002244", color: "#fff" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <h2>rate: {accomm.rate}</h2>
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="edit-div">
                    <p>Claimed Deposit:</p>
                    <input className="inputs" type="number" onChange={(e) => setConfirmBook(prev => ({ ...prev, deposit: e.target.value }))} value={confirmBook.deposit} />
                </div>
                <div className="edit-div2">
                    <p>Total:</p>
                    <div>₱{confirmBook.total}</div>
                </div>
                <div className="edit-div2">
                    <p>Deposit:</p>
                    <div>₱{confirmBook.deposit}</div>
                </div>
                <div className="btns">
                    <button disabled={isLoading} onClick={() => handleConfirmBook(confirmBook)}>Confirm</button>
                    <button onClick={() => setConfirmBook(null)}>Back</button>
                </div>
            </div>
        </div>
    )
}
