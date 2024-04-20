import { useEffect, useState } from "react"

export default function Users({ admin }) {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)

    const handlePage = (type) => {
        if (type == 'back') {
            setPage(p => Math.max(p - 1, 1))
        } else {
            setPage(p => Math.min(p + 1, totalPage))
        }
    }

    useEffect(() => {
        setUsers([])
        const fetchUser = async () => {
            const response = await fetch(`https://cyfres-beach-resort-api.onrender.com/database/users?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${admin.token}`
                }
            })
            const json = await response.json()
            setUsers(json.users)
            setTotalUsers(json.totalUsers)
            setTotalPage(Math.ceil(json.totalUsers / 30))
        }
        fetchUser()
    }, [page])


    return (
        <div className="users">
            <div className="nav">
                <h2>Users</h2>
                <h3>total: {totalUsers}</h3>
                <div className="btns">
                    <i onClick={() => handlePage('back')} className="fa-solid fa-arrow-left" />
                    <h4>Page: {page}/{totalPage}</h4>
                    <i onClick={() => handlePage('next')} className="fa-solid fa-arrow-right" />
                </div>
                <input placeholder="search user" type="text" />
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
                            <div key={user._id} className="user-cont">
                                <h3>{i + 1}</h3>
                                <h3>{user.email}</h3>
                                <h3>{user.booked ? <i className="fa-solid fa-circle-check" /> : <i className="fa-solid fa-circle-xmark" />}</h3>
                                <h3>{user.lastOnline}</h3>
                                <h3>{user.createdAt}</h3>
                            </div>
                        )
                            :
                            <div className="user-cont">
                                <section class="dots-container">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </section>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}