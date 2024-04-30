import { useEffect, useState } from "react"
import { formatDistanceToNow, format } from "date-fns"
import useAdmin from "../../hooks/useAdmin"

export default function Users() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [selectedUser, setSelectedUser] = useState([])

    const { state, dispatch } = useAdmin()

    const handleSelectedUser = (id) => {
        const user = users.filter(user => user._id == id)
        setSelectedUser(user)
    }

    const handlePage = (type) => {
        if (type == 'back') {
            setPage(p => Math.max(p - 1, 1))
        } else {
            setPage(p => Math.min(p + 1, totalPage))
        }
    }

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:5000/database/users?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
        }
        
        if (response.ok) {
            setUsers(json.users)
            setTotalUsers(json.totalUsers)
            setTotalPage(Math.ceil(json.totalUsers / 30))
        }
    }

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:5000/database/users/search?page=${page}&user=${search}&returnedNumUser=${10}`, {
            headers: {
                'Authorization': `Bearer ${state.admin.token}`
            }
        })
        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
        }

        if (json.matching == "No User Found") {
            setUsers([])
        } else {
            setUsers(json.matching)
        }
        setTotalPage(Math.max(Math.ceil(json.totalUsers / 10), 1))
    }

    const handleRefresh = () => {
        fetchUsers()
        setSearch('')
    }

    useEffect(() => {
        if (search.length > 0) {
            fetchUser()
        } else {
            fetchUsers()
            setUsers([])
        }
    }, [page, search])

    useEffect(() => {
        setPage(1)
    }, [search])

    return (
        <div className="users">
            <div className="nav">
                <h2>Users<i className="fa-solid fa-users" /></h2>
                <h3>All Users: {totalUsers}</h3>
                <div className="btns">
                    <i onClick={() => handlePage('back')} className="fa-solid fa-arrow-left" />
                    <h4>Page: {page}/{totalPage}</h4>
                    <i onClick={() => handlePage('next')} className="fa-solid fa-arrow-right" />
                </div>
                <input value={search.trim()} onChange={(e) => setSearch(e.target.value)} placeholder="search user" type="text" />
                <i className="fa-solid fa-rotate" onClick={handleRefresh} />
            </div>
            <div className="users-body">
                <div className="table">
                    <div className="user-cont-nav">
                        <h3>No.</h3>
                        <h3>Email</h3>
                        <h3>Booked</h3>
                        <h3>Last Online</h3>
                        <h3>Account Created</h3>
                    </div>
                    <div className="user-cont-body">
                        {users.length > 0 ? users.map((user, i) =>
                            <div onClick={() => handleSelectedUser(user._id)} key={user._id} className="user-cont">
                                <h3>{i + 1}</h3>
                                <h3>{user.email}</h3>
                                <h3>{user.booked ? <i className="fa-solid fa-circle-check" /> : <i className="fa-solid fa-circle-xmark" />}</h3>
                                <h3>{formatDistanceToNow(user.lastOnline)}</h3>
                                <h3>{format(user.createdAt, 'MMM dd, yyyy')}</h3>
                            </div>
                        )
                            :
                            search.length > 0 ?
                                <div className="user-cont">
                                    <section className="dots-container">No Result</section>
                                </div>
                                :
                                <div className="user-cont">
                                    <section className="dots-container">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </section>
                                </div>
                        }
                    </div>
                </div>
            </div>
            {selectedUser.length > 0 && selectedUser.map(user => (
                <div key={user._id} className="selected-user-cont">
                    <div className="selected-user-card">
                        <div className="selected-user-nav">
                            <i className="fa-solid fa-user" />
                            <h2>{user.email}</h2>
                            <i onClick={() => setSelectedUser([])} className="fa-solid fa-square-xmark" />
                        </div>
                        <div className="selected-user-body">
                            <div className="personal-details-cont">
                                <h4>Personal Details</h4>
                                <div className="personal-details">
                                    <h2>Name:</h2>
                                    <h3>John Thomas Alog</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Address:</h2>
                                    <h3>Abra st. Barretto Olongapo City</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Contact Number:</h2>
                                    <h3>09488457315</h3>
                                </div>
                            </div>
                            <div className="personal-details-cont">
                                <h4>Booking Details</h4>
                                <div className="personal-details">
                                    <h2>Status:</h2>
                                    <h3>Pending</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>In:</h2>
                                    <h3>Dec 27, 2000</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Out:</h2>
                                    <h3>Dec 28, 2000</h3>
                                </div>
                                <div className="personal-details">
                                    <h2>Total Day/s:</h2>
                                    <h3>1 Day</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}