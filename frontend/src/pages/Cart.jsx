import { useEffect, useState } from "react"
import { format, set } from 'date-fns'
import { useGlobalContext } from "../hooks/useGlobalContext"

import CancelOptions from "../components/CancelOptions"
import Loader from '../components/Loader'

export default function Cart({ setCartNum }) {
    const { state } = useGlobalContext()

    const [books, setBooks] = useState([])
    const [cancelOpts, setCancelOpts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        state.user && fetchAllBook()
    }, [state.user])

    useEffect(() => {
        !isLoading && setCartNum(books.length)
    }, [books])

    const fetchAllBook = async () => {
        const response = await fetch(`${state.uri}/book/get?_id=${state.user._id}`, {
            headers: {
                'Authorization': `Bearer ${state.user.token}`
            }
        })

        const json = await response.json()
        setBooks([])
        json.books.map(book => setBooks(p => [...p, book]))
        setIsLoading(false)
    }

    return (
        <div className="cart">
            {isLoading ?
                <Loader />
                :
                <>
                    {books.map(book => (
                        <div key={book._id} className="books">
                            <div className="head">
                                <h1>{book.status}</h1>
                                {book.status == "Pending" && !cancelOpts.includes(book._id) && <button onClick={() => setCancelOpts(p => [...p, book._id])}>Cancel</button>}
                            </div>
                            <hr />
                            {cancelOpts.includes(book._id) ?
                                <CancelOptions setBooks={setBooks} books={books} book={book} setCancelOpts={setCancelOpts} />
                                :
                                <>
                                    <h2>{format(book.dateIn, 'MMM d, yyyy')} - {format(book.dateOut, 'MMM d, yyyy')}</h2>
                                    <hr />
                                    {book.slctRoom.map(room => (
                                        <div key={room._id} className="room">
                                            <h3>{room.accommName}</h3>
                                            {room?.maxPerson > 0 && <h3>{room.add == 0 && 'Max'} {room.maxPerson + room.add} Person{room.maxPerson !== 1 && 's'}</h3>}
                                            {room.add ? <h3>₱{room.rate + (room.add * room.addPersonRate)}</h3> : <h3>₱{room.rate}</h3>}
                                        </div>
                                    ))}
                                    <hr />
                                    {book.status == "Pending" &&
                                        <>
                                            <h2>Total Amount: ₱{book.total}</h2>
                                            <h2>Minimum Deposit: ₱{book.deposit}</h2>
                                        </>
                                    }
                                    {book.status == "Confirmed" &&
                                        <>
                                            <h2>Total Amount: ₱{book.total}</h2>
                                            <h2>Total Deposits: ₱{book.deposit}</h2>
                                            <h2>Balance: ₱{book.total - book.deposit}</h2>
                                        </>
                                    }

                                </>
                            }
                        </div>
                    ))}
                </>
            }
        </div>
    )
}