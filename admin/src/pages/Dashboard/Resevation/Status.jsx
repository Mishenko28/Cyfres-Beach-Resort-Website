export default function Status({ toggles, setToggles }) {

    const handleToggles = (value) => {
        return () => {
            setToggles(value)
        }
    }

    return (
        <div className="status-nav-cont">
            <div className="status-nav" onClick={handleToggles('ongoing')}>
                <h2>Ongoing</h2>
                <div style={toggles !== 'ongoing' ? { display: 'none' } : null} className="bridge"></div>
            </div>
            <div className="status-nav" onClick={handleToggles('pending')}>
                <h2>Pending</h2>
                <div style={toggles !== 'pending' ? { display: 'none' } : null} className="bridge"></div>
            </div>
            <div className="status-nav" onClick={handleToggles('confirmed')}>
                <h2>Confirmed</h2>
                <div style={toggles !== 'confirmed' ? { display: 'none' } : null} className="bridge"></div>
            </div>
            <div className="status-nav" onClick={handleToggles('completed')}>
                <h2>Completed</h2>
                <div style={toggles !== 'completed' ? { display: 'none' } : null} className="bridge"></div>
            </div>
            <div className="status-nav" onClick={handleToggles('cancelled')}>
                <h2>Cancelled</h2>
                <div style={toggles !== 'cancelled' ? { display: 'none' } : null} className="bridge"></div>
            </div>
            <div className="status-nav" onClick={handleToggles('noshow')}>
                <h2>No-show</h2>
                <div style={toggles !== 'noshow' ? { display: 'none' } : null} className="bridge"></div>
            </div>
        </div>
    )
}
