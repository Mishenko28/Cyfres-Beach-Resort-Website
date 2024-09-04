import { useEffect, useState } from "react"
import useAdmin from "../../../hooks/useAdmin"
import User from "../../../components/User"
import { format, formatDistance } from "date-fns"
import Loader from "../../../components/Loader"
import EditReservation from "./EditReservation"

export default function OnGoing() {
    const { state, dispatch } = useAdmin()

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/get/ongoing`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(json.ongoing)
        setIsLoading(false)
    }

    const handleSelectedUser = async (id) => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/user/details?_id=${id}`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`,
            },
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setSelectedUser(json.map((u) => ({ ...u, details: true })))
        setIsLoading(false)
    }

    const handleSaveEdit = async (book) => {
        setIsLoading(true)
        const { _id, userId, dateIn, dateOut, question, slctRoom, deposit, total } = book

        const response = await fetch(`${state.uri}/book/edit`, {
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

        setBooks(prev => prev.map(obj => obj._id == json._id ? { ...json } : obj))
        setEdit(null)
        setIsLoading(false)
    }

    const handleEdit = (e, book) => {
        e.stopPropagation()
        setEdit(book)
    }

    const handleRefresh = () => {
        fetchBooks()
    }

    return (
        <div className="ongoing table">
            {isLoading && <div className="loader"></div>}
            <div className="head">
                <h2>Reservation Date</h2>
                <h2>Total Period</h2>
                <h2>Sum Total</h2>
                <h2>Claimed Deposit</h2>
                <h2>Remaining Balance</h2>
                <h2>Accommodations</h2>
                <h3><i className="fa-solid fa-rotate" onClick={handleRefresh} /></h3>
            </div>
            <div className="data">
                {isLoading ?
                    <div className="box"><Loader /></div>
                    :
                    <>
                        {books.map(book => (
                            <div onClick={() => handleSelectedUser(book.userId)} key={book._id} className="box">
                                <h2>
                                    {format(book.dateIn, "MMM d, yyyy")} - {" "}
                                    {format(book.dateOut, "MMM d, yyyy")}
                                </h2>
                                <h2>{formatDistance(book.dateIn, book.dateOut)}</h2>
                                <h2>₱ {book.total}</h2>
                                <h2>₱ {book.deposit}</h2>
                                <h2>₱ {book.total - book.deposit}</h2>
                                <div className="acc">
                                    {book.slctRoom.map((acc) => {
                                        return (
                                            <h3 key={acc._id}>{acc.accommName + (acc.add ? ` (${acc.maxPerson}+${acc.add} Persons)` : "")}</h3>
                                        )
                                    })}
                                </div>
                                <div className="btnss">
                                    <button className="edit" onClick={(e) => handleEdit(e, book)}>Edit</button>
                                    <button className="complete" onClick={(e) => handleEdit(e, book)}>Complete</button>
                                </div>
                            </div>
                        ))}
                        {books.length == 0 && (<div className="box" style={{ justifyContent: "center" }}>There are currently no confirmed reservations.</div>)}
                    </>
                }
            </div>
            {edit && <EditReservation status={'ongoing'} edit={edit} setBooks={setBooks} setEdit={setEdit} />}
            {selectedUser.length > 0 && selectedUser.map((user) => <User key={user._id} setSelectedUser={setSelectedUser} user={user} />)}
        </div>
    )
}