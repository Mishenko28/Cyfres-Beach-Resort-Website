import useAdmin from "../hooks/useAdmin"

export default function TokenExpired() {
    const { dispatch, fetchNewToken } = useAdmin()

    return (
        <div className="tiles-cont">
            <div className="expired-card">
                <h1>Session Expired</h1>
                <div className="btn-cont">
                    <button onClick={fetchNewToken}>Refresh</button>
                    <button onClick={() => dispatch({type: "LOGOUT"})}>Logout</button>
                </div>
            </div>
        </div>
    )
}
