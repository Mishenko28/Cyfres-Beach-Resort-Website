import { useState } from "react"
import { useGlobalContext } from "../hooks/useGlobalContext"

export default function CancelOptions({ setBooks, books, book, setCancelOpts }) {
    const { state } = useGlobalContext()

    const [slctReas, setSlctReas] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [pleaseSlctTogg, setPleaseSlctTogg] = useState(false)

    const handleCancelBook = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/book/cancel`, {
            method: 'POST',
            body: JSON.stringify({ book, reason: slctReas }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.user.token}`
            }
        })

        const json = await response.json()

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
                    {pleaseSlctTogg && <h3 className="please-slct">Please select a reason to cancel.</h3>}
                    <h1>Why do you want to cancel this Reservation?</h1>
                    <div className="optns">
                        <input onChange={() => setSlctReas("Change of Plans")} type="radio" className="reasons" name="options" />
                        <h2>Change of Plans</h2>
                    </div>
                    <div className="optns">
                        <input onChange={() => setSlctReas("Financial Constraints")} type="radio" className="reasons" name="options" />
                        <h2>Financial Constraints</h2>
                    </div>
                    <div className="optns">
                        <input onChange={() => setSlctReas("Emergency Situations")} type="radio" className="reasons" name="options" />
                        <h2>Emergency Situations</h2>
                    </div>
                    <div className="optns">
                        <input onChange={() => setSlctReas("Personal Reasons")} type="radio" className="reasons" name="options" />
                        <h2>Personal Reasons</h2>
                    </div>
                    <div className="other">
                        <h2>Other reason:</h2>
                        <textarea onChange={handleTextareaChange} ></textarea>
                    </div>
                    <div className="btns">
                        <button className="cancel" onClick={() => setCancelOpts(p => p.filter(slct => slct !== book._id))}>Back</button>
                        <button onClick={slctReas ? handleCancelBook : () => setPleaseSlctTogg(true)} className="save">Confirm</button>
                    </div>
                </>
            }
        </div>
    )
}