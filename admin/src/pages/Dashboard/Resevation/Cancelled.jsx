import { useEffect, useState } from "react"
import useAdmin from "../../../hooks/useAdmin";
import User from "../../../components/User"
import { format, } from "date-fns"
import Loader from "../../../components/Loader";

export default function Cancelled() {
    const { state, dispatch } = useAdmin()

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [selectedUser, setSelectedUser] = useState([])

    useEffect(() => {
        fetchCancelled()
    }, [])

    const fetchCancelled = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/get/cancel`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setBooks(json.cancelled)
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
        fetchCancelled()
    }

    return (
        <div className="cancelled table">
            {isLoading && <div className="loader"></div>}
            <div className="head">
                <h2>Date Created</h2>
                <h2>Date Cancelled</h2>
                <h2>Accommodations</h2>
                <h2>Reason</h2>
                <h3><i className="fa-solid fa-rotate" onClick={handleRefresh} /></h3>
            </div>
            <div className="data">
                {isLoading ?
                    <div className="box"><Loader /></div>
                    :
                    <>
                        {books.map(book => (
                            <div onClick={() => handleSelectedUser(book.userId)} key={book._id} className="box">
                                <h2>{format(book.book.createdAt, "MMM d, yyyy")}</h2>
                                <h2>{format(book.createdAt, "MMM d, yyyy")}</h2>
                                <div className="acc">
                                    {book.book.slctRoom.map((acc) => {
                                        return (
                                            <h3 key={acc._id}>{acc.accommName + (acc.add ? ` (${acc.maxPerson}+${acc.add} Persons)` : "")}</h3>
                                        )
                                    })}
                                </div>
                                <h2>{book.reason}</h2>
                                <div className="btnss"></div>
                            </div>
                        ))}
                        {books.length == 0 && (<div className="box" style={{ justifyContent: "center" }}>There are currently no cancelled reservations.</div>)}
                    </>
                }
            </div>
            {selectedUser.length > 0 && selectedUser.map((user) => <User key={user._id} setSelectedUser={setSelectedUser} user={user} />)}
        </div>
    )
}
