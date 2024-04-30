export default function Booking() {
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
                    <input type="datetime-local" />
                    <h3>Check Out Date:</h3>
                    <input type="datetime-local" />
                    <h3>Complete Period:</h3>
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
                    <textarea/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}