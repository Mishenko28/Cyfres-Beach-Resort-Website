import { formatDistance } from "date-fns"
import useAdmin from "../../../hooks/useAdmin"
import { useEffect, useState } from "react"
import Loader from '../../../components/Loader'

export default function EditReservation({ status, edit, setEdit, setBooks }) {
    const { state, dispatch } = useAdmin()
    const [accommodations, setAccommodations] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)

    useEffect(() => {
        fetchAccomm()
    }, [])

    useEffect(() => {
        handleTotal()
    }, [edit.slctRoom])

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

    const handleSaveEdit = async (book) => {
        setIsLoadingSave(true)
        const { _id, bookId, userId, dateIn, dateOut, question, slctRoom, deposit, total } = book

        const response = await fetch(`${state.uri}/book/edit/${status}`, {
            method: "POST",
            body: JSON.stringify({
                _id,
                bookId,
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

        await setBooks(prev => prev.map(obj => obj._id == json._id ? { ...json } : obj))
        await setEdit(null)
        setIsLoadingSave(false)
    }

    const handleToggleRoom = (accomm) => {
        if (edit.slctRoom.some(room => room.accommName == accomm.accommName)) {
            setEdit(prev => ({ ...prev, slctRoom: prev.slctRoom.filter(room => room.accommName !== accomm.accommName) }))
            return
        }
        accomm.add = 0
        setEdit(prev => ({ ...prev, slctRoom: [...prev.slctRoom, accomm] }))
    }

    const handleAddPerson = (e, isIncreament, accomm) => {
        e.stopPropagation()

        setEdit(prev => ({ ...prev, slctRoom: prev.slctRoom.map(room => room.accommName == accomm.accommName ? { ...room, add: isIncreament ? room.add + 1 : room.add - 1 } : room) }))
    }

    const handleTotal = () => {
        setEdit(prev => ({ ...prev, total: 0 }))
        setEdit(prev => ({ ...prev, total: prev.slctRoom.reduce((sum, room) => sum + room.rate + (room.add ? room.add * room.addPersonRate : 0), 0) }))
        setEdit(prev => ({ ...prev, deposit: prev.total * 0.5 }))
    }

    const handleBackButton = () => {
        setEdit(null)
    }

    return (
        <div className="blur-cont">
            <div className="edit-cont">
                {isLoadingSave && <div className="loader"></div>}
                <h2>Edit Reservation </h2>
                <div className="edit-div">
                    <p>Date In:</p>
                    <input className="inputs" type="date" onChange={(e) => setEdit(prev => ({ ...prev, dateIn: e.target.value }))} value={new Date(edit.dateIn).toLocaleDateString("en-CA")} />
                </div>
                <div className="edit-div">
                    <p>Date Out: ({formatDistance(edit.dateIn, edit.dateOut)})</p>
                    <input className="inputs" type="date" onChange={(e) => setEdit(prev => ({ ...prev, dateOut: e.target.value }))} value={new Date(edit.dateOut).toLocaleDateString("en-CA")} />
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
                                            style={edit.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#002244", color: "#fff" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <hr style={edit.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#fff" } : null} />
                                            <h2>rate:<h3>₱ {accomm.rate}</h3></h2>
                                            <h2>max:<h3>{accomm.maxPerson}</h3></h2>
                                            {edit.slctRoom.some(room => room.accommName == accomm.accommName) ?
                                                <>
                                                    <h2>add: <h3>({accomm.addPersonRate} * {edit.slctRoom.map(room => room.accommName == accomm.accommName && room.add)})</h3></h2>
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
                                            style={edit.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#002244", color: "#fff" } : null}
                                            key={accomm._id}
                                            onClick={() => handleToggleRoom(accomm)}
                                        >
                                            <h2>{accomm.accommName}</h2>
                                            <hr style={edit.slctRoom.some(room => room.accommName == accomm.accommName) ? { backgroundColor: "#fff" } : null} />
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
                    <input className="inputs" type="number" onChange={(e) => setEdit(prev => ({ ...prev, deposit: e.target.value }))} value={edit.deposit} />
                </div>
                <div className="edit-div2">
                    <p>Total:</p>
                    <div>₱{edit.total}</div>
                </div>
                <div className="edit-div2">
                    <p>Deposit:</p>
                    <div>₱{edit.deposit}</div>
                </div>
                {!isLoading && !isLoadingSave &&
                    <div className="btns">
                        <button onClick={() => handleSaveEdit(edit)}>Save</button>
                        <button onClick={handleBackButton}>Back</button>
                    </div>
                }
            </div>
        </div>
    )
}