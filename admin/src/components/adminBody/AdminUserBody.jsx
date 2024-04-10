import { useEffect, useState } from "react"
import { formatDistanceToNow, format } from 'date-fns'

export default function AdminUserBody({ state, dispatch }) {
    const [users, setUsers] = useState(null)
    const [totalUsers, setTotalUsers] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`https://cyfres-beach-resort-api.onrender.com/database/users?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${state.admin.token}`
                }
            })
            const json = await response.json()

            json.error && json.error.message == 'jwt expired' && dispatch({type: "ADMIN_LOGOUT"})

            setUsers(json.users)
            setTotalUsers(json.totalUsers)
            setTotalPage(Math.max(1, Math.ceil(json.totalUsers / 10)))
        }
        
        fetchUsers()
    }, [page])


    return (
        <div className="users">
            <h1 className="heading">Users</h1>
            <h2>Total Users: {totalUsers}</h2>
            <div className="users-table">
                <div className="user-tabs">
                    <h1>Email</h1>
                    {users && users.map(user => <h2 key={user._id}>{user.email}</h2>)}
                </div>
                <div className="user-tabs">
                    <h1>Booked</h1>
                    {users && users.map(user => <h2 key={user._id}>{user.booked ? <i className="fa-solid fa-circle-check" /> : <i className="fa-solid fa-circle-xmark" />}</h2>)}
                </div>
                <div className="user-tabs">
                    <h1>Last online</h1>
                    {users && users.map(user => <h2 key={user._id}>{formatDistanceToNow(user.lastOnline, {addSuffix: true})}</h2>)}
                </div>
                <div className="user-tabs">
                    <h1>Account Creation Date</h1>
                    {users && users.map(user => <h2 key={user._id}>{format(user.createdAt, 'MMM d h:mm a yyyy')}</h2>)}
                </div>
            </div>
            <div className="users-page">
                <button onClick={() => setPage(Math.max(1, page - 1))}><i className="fa-solid fa-circle-arrow-left" /></button>
                <h1>Page:{page}/{totalPage}</h1>
                <button onClick={() => setPage(Math.min(totalPage, page + 1))}><i className="fa-solid fa-circle-arrow-right" /></button>
            </div>
        </div>
    )
}
