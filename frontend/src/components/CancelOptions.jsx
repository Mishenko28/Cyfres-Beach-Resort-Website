import { useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function CancelOptions({ setBooks, books, book, setCancelOpts }) {
    const { state } = useGlobalContext()

    const [slctReas, setSlctReas] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleCancelBook = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/database/user/book-cancel`, {
            method: 'POST',
            body: JSON.stringify({ _id: state.user._id, book, reason: slctReas }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.user.token}`
            }
        })

        const json = await response.json()
        console.log(json)
        setBooks(books.filter(book => book._id !== json.bookCancel._id))
        setIsLoading(false)
    }

    const handleTextareaChange = (e) => {
        setSlctReas(e.target.value)
        document.querySelectorAll('input[type="radio"].reasons').forEach(input => input.checked = false);
    }

    return (
        <div className="cancel-optns-cont">
            {isLoading ?
                <div className="loader"></div>
                :
                <>
                    <h1>Why do you want to cancel this Reservation?</h1>
                    <div className="optns">
                        <input onChange={() => setSlctReas("Change of Plans")} type="radio" className="reasons" name="options" />
                        <h2>Change of Plans</h2>
                    </div>
                    <div className="optns">
                        <input onClick={() => setSlctReas("Financial Constraints")} type="radio" className="reasons" name="options" />
                        <h2>Financial Constraints</h2>
                    </div>
                    <div className="optns">
                        <input onClick={() => setSlctReas("Emergency Situations")} type="radio" className="reasons" name="options" />
                        <h2>Emergency Situations</h2>
                    </div>
                    <div className="optns">
                        <input onClick={() => setSlctReas("Personal Reasons")} type="radio" className="reasons" name="options" />
                        <h2>Personal Reasons</h2>
                    </div>
                    <div className="other">
                        <h2>Other reason:</h2>
                        <textarea onChange={handleTextareaChange} ></textarea>
                    </div>
                    <div className="btns">
                        <button className="cancel" onClick={() => setCancelOpts(p => p.filter(slct => slct !== book._id))}>Cancel</button>
                        {slctReas && <button onClick={handleCancelBook} className="save">Save</button>}
                    </div>
                </>
            }
        </div>
    )
}