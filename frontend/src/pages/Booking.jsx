import { useState } from "react"

export default function Booking() {
    const [dateIn, setDateIn] = useState(new Date().toLocaleDateString('en-CA'))
    const [dateOut, setDateOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA'))
    const totalPeriod = (new Date(dateOut) - new Date(dateIn)) / 86400000

    const handleDate = (e, type) => {
        if (type == 'in') {
            if (Math.ceil((new Date(e.target.value) - new Date()) / 86400000) >= 0) {
                setDateIn(e.target.value)
                setDateOut(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1)).toLocaleDateString('en-CA'))
            } else {
                setDateIn(new Date().toLocaleDateString('en-CA'))
            }
        } else {
            if (((new Date(e.target.value) - new Date(dateIn)) / 86400000) > 0) {
                setDateOut(e.target.value)
            } else {
                setDateOut(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA'))
            }

        }
    }

    return (
        <div className="booking">
            <form>
                <h1>Reservation Form</h1>
                <div className="note">
                    <h3>Note:</h3>
                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, odio modi? Temporibus ipsa aliquam sint ipsam perferendis labore officia! Rem quia dicta vel, debitis porro voluptatum accusantium sed quae repellat!</h2>
                </div>
                <div className="date">
                    <h3>Check In Date:</h3>
                    <input type="date" value={dateIn} onChange={(e) => handleDate(e, 'in')} />
                    <h3>Check Out Date:</h3>
                    <input type="date" value={dateOut} onChange={(e) => handleDate(e, 'out')} />
                    <div>
                        <h3>Total Period:</h3>
                        {totalPeriod !== 0 &&
                            <h5>{totalPeriod} {totalPeriod == 1 ? 'Day' : 'Days'}</h5>
                        }
                    </div>
                </div>
                <div className="rooms-cont">
                    <h3>Select Room/s</h3>
                    <h4>Total Amount:</h4>
                    <h4>Deposit Amount:</h4>
                    <div className="rooms">
                        <div className="room">
                            <input type="checkbox" id="room1" />
                            <label htmlFor="room1">Room 1</label>
                        </div>
                        <div className="room">
                            <input type="checkbox" id="room2" />
                            <label htmlFor="room2">Room 2</label>
                        </div>
                        <div className="room">
                            <input type="checkbox" id="room3" />
                            <label htmlFor="room3">Room 3</label>
                        </div>
                        <div className="room">
                            <input type="checkbox" id="room4" />
                            <label htmlFor="room4">Room 4</label>
                        </div>
                    </div>
                </div>
                <div className="req">
                    <h3>Request or Questions?</h3>
                    <textarea />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}