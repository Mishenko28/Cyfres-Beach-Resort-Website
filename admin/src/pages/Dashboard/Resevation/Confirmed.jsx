import { useEffect, useState } from "react"
import useAdmin from "../../../hooks/useAdmin"
import User from "../../../components/User"
import { format, formatDistance } from "date-fns"
import Confirmation from "../../../components/Confirmation"

export default function Confirmed() {
    const { state, dispatch } = useAdmin()

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [cancelBook, setCancelBook] = useState(null)
    const [selectedUser, setSelectedUser] = useState([])
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/get/confirm`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(json.confirmed)
        setIsLoading(false)
    }

    const handleCancelBook = async (book) => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/cancel`, {
            method: "POST",
            body: JSON.stringify({ book, reason: "removed by admin" }),
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

        setBooks(books.filter((book) => book._id !== json.bookCancel._id))
        setCancelBook(null)
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

    const handleCancekBtn = (e, book) => {
        e.stopPropagation()
        setCancelBook(book)
    }

    const handleEdit = (e, book) => {
        e.stopPropagation()
        setEdit(book)
    }

    const handleRefresh = () => {
        fetchBooks()
    }

    return (
        <div className="confirmed table">
            {isLoading && <div className="loader"></div>}
            <div className="head">
                <h2>Reservation Date</h2>
                <h2>Total Period</h2>
                <h2>Claimed Deposit</h2>
                <h2>Remaining Balance</h2>
                <h2>Accommodations</h2>
                <i className="fa-solid fa-rotate" onClick={handleRefresh} />
            </div>
            <div className="data">
                {books.map(book => (
                    <div onClick={() => handleSelectedUser(book.userId)} key={book._id} className="box">
                        <h2>
                            {format(book.dateIn, "MMM d, yyyy")} - {" "}
                            {format(book.dateOut, "MMM d, yyyy")}
                        </h2>
                        <h2>{formatDistance(book.dateIn, book.dateOut)}</h2>
                        <h2>{book.deposit}</h2>
                        <h2>{book.balance}</h2>
                        <div className="acc">
                            {book.slctRoom.map((acc) => {
                                return (
                                    <h3 key={acc._id}>{acc.name + (acc.add ? ` (${acc.max}+${acc.add} Persons)` : "")}</h3>
                                )
                            })}
                        </div>
                        <div className="btnss">
                            <button onClick={(e) => handleEdit(e, book)}>Edit</button>
                            <button onClick={(e) => handleCancekBtn(e, book)}>Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
            {edit &&
                <div className="blur-cont">
                    <div className="edit-cont">
                        <h2>Edit Reservation</h2>
                        <div className="edit-div">
                            <p>Date In:</p>
                            <input className="inputs" type="date" onChange={(e) => setEdit(prev => ({ ...prev, dateIn: e.target.value }))} value={new Date(edit.dateIn).toLocaleDateString("en-CA")} />
                        </div>
                        <div className="edit-div">
                            <p>Date Out:</p>
                            <input className="inputs" type="date" onChange={(e) => setEdit(prev => ({ ...prev, dateOut: e.target.value }))} value={new Date(edit.dateOut).toLocaleDateString("en-CA")} />
                        </div>
                        <div className="edit-div">
                            <p>Room:</p>
                            <div className="inputs">Example Room</div>
                        </div>
                        <div className="edit-div">
                            <p>Claimed Deposit:</p>
                            <input className="inputs" type="number" onChange={(e) => setEdit(prev => ({ ...prev, deposit: e.target.value }))} value={edit.deposit} />
                        </div>
                        <div className="edit-div2">
                            <p>Total:</p>
                            <div>₱{edit.balance + edit.deposit}</div>
                        </div>
                        <div className="edit-div2">
                            <p>Claimed Deposit:</p>
                            <div>₱{edit.deposit}</div>
                        </div>
                        <div className="btns">
                            <button onClick={() => handleedit(edit)}>Save</button>
                            <button onClick={() => setEdit(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {selectedUser.length > 0 && selectedUser.map((user) => <User key={user._id} setSelectedUser={setSelectedUser} user={user} />)}
            {cancelBook &&
                <Confirmation
                    mssg={"Are you sure you want to cancel this Reservation?"}
                    btn1={"Yes"}
                    btn2={"No"}
                    btn1F={() => handleCancelBook(cancelBook)}
                    btn2F={() => setCancelBook(null)}
                />
            }
        </div>
    )
}
