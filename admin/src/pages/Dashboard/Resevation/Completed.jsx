import { useEffect, useState } from "react"
import useAdmin from "../../../hooks/useAdmin"
import User from "../../../components/User"
import { format, formatDistance } from "date-fns"
import Loader from "../../../components/Loader"

export default function Completed() {
    const { state, dispatch } = useAdmin()

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [selectedUser, setSelectedUser] = useState([])

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/get/complete`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(json.complete)
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

    const handleRefresh = () => {
        fetchBooks()
    }

    return (
        <div className="completed table">
            {isLoading && <div className="loader"></div>}
            <div className="head">
                <h2>Reservation Date</h2>
                <h2>Total Period</h2>
                <h2>Sum Total</h2>
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
                                <div className="acc">
                                    {book.slctRoom.map((acc) => {
                                        return (
                                            <h3 key={acc._id}>{acc.accommName + (acc.add ? ` (${acc.maxPerson}+${acc.add} Persons)` : "")}</h3>
                                        )
                                    })}
                                </div>
                                <div className="btnss">
                                </div>
                            </div>
                        ))}
                        {books.length == 0 && (<div className="box" style={{ justifyContent: "center" }}>There are currently no confirmed reservations.</div>)}
                    </>
                }
            </div>
            {selectedUser.length > 0 && selectedUser.map((user) => <User key={user._id} setSelectedUser={setSelectedUser} user={user} />)}
        </div>
    )
}
