import { formatDistance } from "date-fns"
import useAdmin from "../../../hooks/useAdmin"
import { useEffect, useState } from "react"
import Loader from '../../../components/Loader'

export default function ConfirmReservation({ confirmBook, setConfirmBook, setBooks }) {
    const { state, dispatch } = useAdmin()
    const [accommodations, setAccommodations] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingConfirm, setIsLoadingConfirm] = useState(false)
    const totalPeriod = (new Date(confirmBook.dateOut) - new Date(confirmBook.dateIn)) / 86400000

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
        setIsLoadingConfirm(true)
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

        await setBooks(prev => prev.filter((book) => book._id !== json._id))
        await setConfirmBook(null)
        setIsLoadingConfirm(false)
    }

    const handleToggleRoom = (accomm) => {
        if (confirmBook.slctRoom.some(room => room.accommName == accomm.accommName)) {
            setConfirmBook(prev => ({ ...prev, slctRoom: prev.slctRoom.filter(room => room.accommName !== accomm.accommName) }))
            return
        }
        accomm.add = 0
        setConfirmBook(prev => ({ ...prev, slctRoom: [...prev.slctRoom, accomm] }))
    }

    const handleAddPerson = (e, isIncreament, accomm) => {
        e.stopPropagation()

        setConfirmBook(prev => ({ ...prev, slctRoom: prev.slctRoom.map(room => room.accommName == accomm.accommName ? { ...room, add: isIncreament ? room.add + 1 : room.add - 1 } : room) }))
    }

    const handleTotal = () => {
        setConfirmBook(prev => ({ ...prev, total: 0 }))
        setConfirmBook(prev => ({ ...prev, total: prev.slctRoom.reduce((sum, room) => sum + (totalPeriod * (room.rate + (room.add ? room.add * room.addPersonRate : 0))), 0) }))
        setConfirmBook(prev => ({ ...prev, deposit: prev.total * 0.5 }))
    }

    const handleBackButton = () => {
        setConfirmBook(null)
    }

    return (
        <div className="blur-cont">
            <div className="edit-cont">
                {isLoadingConfirm && <div className="loader"></div>}
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
                                            style={confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#9FD0EA" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <hr />
                                            <h2>rate:<h3>₱ {accomm.rate}</h3></h2>
                                            <h2>max:<h3>{accomm.maxPerson}</h3></h2>
                                            {confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ?
                                                <>
                                                    <h2>add: <h3>({accomm.addPersonRate} * {confirmBook.slctRoom.map(room => room.accommName == accomm.accommName && room.add)})</h3></h2>
                                                    <div className="bttns">
                                                        <button onClick={(e) => { handleAddPerson(e, false, accomm) }}>-</button>
                                                        <button onClick={(e) => { handleAddPerson(e, true, accomm) }}>+</button>
                                                    </div>
                                                </>
                                                :
                                                <h2>add: <h3>{accomm.addPersonRate}</h3></h2>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <h2 className="acc-nav">Cottages</h2>
                                <div className="accomm-cont">
                                    {accommodations.map(accomm => accomm.accommType == 'cottage' && (
                                        <div
                                            className="accomm"
                                            style={confirmBook.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#9FD0EA" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <hr />
                                            <h2>rate: <h3>₱ {accomm.rate}</h3></h2>
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
                {!isLoadingConfirm && !isLoading &&
                    <div className="btns">
                        <button onClick={() => handleConfirmBook(confirmBook)}>Confirm</button>
                        <button onClick={handleBackButton}>Back</button>
                    </div>
                }
            </div>
        </div>
    )
}
