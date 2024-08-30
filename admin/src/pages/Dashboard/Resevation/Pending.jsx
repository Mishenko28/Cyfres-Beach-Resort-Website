import { useEffect, useRef, useState } from "react"
import useAdmin from "../../../hooks/useAdmin"
import { format, formatDistance, formatDistanceToNow } from "date-fns"
import User from "../../../components/User"
import Confirmation from "../../../components/Confirmation"
import ConfirmReservation from "./ConfirmReservation"
import Loader from "../../../components/Loader"

export default function Pending() {
    const { state, dispatch } = useAdmin()
    const [selectedUser, setSelectedUser] = useState([])
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cancelBook, setCancelBook] = useState(null)
    const [confirmBook, setConfirmBook] = useState(null)

    const [question, setQuestion] = useState("")

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/get/pending`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(json.pendings)
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

    const handleQuestion = (e, question) => {
        e.stopPropagation()
        setQuestion(question)
    }

    const handleCancelBook = async (book) => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/cancel`, {
            method: "POST",
            body: JSON.stringify({ book, reason: `removed by admin (${state.admin.email})` }),
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

    const handleCancelBtn = (e, book) => {
        e.stopPropagation()
        setCancelBook(book)
    }

    const handleConfirmBtn = (e, book) => {
        e.stopPropagation()
        setConfirmBook({ ...book, deposit: book.total * 0.5 })
    }

    const handleRefresh = () => {
        fetchBooks()
    }

    return (
        <div className="pending table">
            {isLoading && <div className="loader"></div>}
            <div className="head">
                <h2>Submission Time</h2>
                <h2>Reservation Date</h2>
                <h2>Total Period</h2>
                <h2>Sum Total</h2>
                <h2>Down Payment</h2>
                <h2>Accommodations</h2>
                <h2>Question</h2>
                <h3><i className="fa-solid fa-rotate" onClick={handleRefresh} /></h3>
            </div>
            <div className="data">
                {isLoading ?
                    <div className="box"><Loader /></div>
                    :
                    <>
                        {books.map((book) => (
                            <div onClick={() => handleSelectedUser(book.userId)} key={book._id} className="box">
                                <h2>{formatDistanceToNow(book.createdAt, { addSuffix: true })}</h2>
                                <h2>
                                    {format(book.dateIn, "MMM d, yyyy")} - {" "}
                                    {format(book.dateOut, "MMM d, yyyy")}
                                </h2>
                                <h2>{formatDistance(book.dateIn, book.dateOut)}</h2>
                                <h2>₱{book.total}</h2>
                                <h2>₱{book.deposit}</h2>
                                <div className="acc">
                                    {book.slctRoom.map((acc) => {
                                        return (
                                            <h3 key={acc._id}>{acc.accommName + (acc.add ? ` (${acc.maxPerson}+${acc.add} Persons)` : "")}</h3>
                                        )
                                    })}
                                </div>
                                <h2><i style={book.question ? { color: "green" } : { color: "red", cursor: "not-allowed" }} onClick={(e) => handleQuestion(e, book.question)} className="fa-solid fa-circle-question" /></h2>
                                <div className="btnss">
                                    <button className="confirm" onClick={(e) => handleConfirmBtn(e, book)}>Confirm</button>
                                    <button className="cancel" onClick={(e) => handleCancelBtn(e, book)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                        {books.length == 0 && (<div className="box" style={{ justifyContent: "center" }}>There are currently no pending reservations.</div>)}
                    </>
                }
            </div>
            {question && (
                <div className="blur-cont">
                    <div className="q-cont">
                        <i onClick={() => setQuestion("")} className="fa-solid fa-square-xmark" />
                        <h2>Question:</h2>
                        <h3>{question}</h3>
                    </div>
                </div>
            )}
            {selectedUser.length > 0 && selectedUser.map((user) => <User key={user._id} setSelectedUser={setSelectedUser} user={user} />)}
            {confirmBook &&
                <ConfirmReservation
                    confirmBook={confirmBook}
                    setConfirmBook={setConfirmBook}
                    setBooks={setBooks}
                />}
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
