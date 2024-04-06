import { useEffect, useState } from "react"
import { useGlobalContext } from '../../../hooks/useGlobalContext'

export default function AdminUserSearched({ setActive }) {
    const { state } = useGlobalContext()
    
    const [searchedUsers, setSearchedUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [state.disposableCont])

    useEffect(() => {
        const fetchSearchedUsers = async () => {
            const response = await fetch(`http://localhost:5000/database/users/search?user=${state.disposableCont}&returnedNumUser=10&page=${page}`)

            const json = await response.json()

            setSearchedUsers(json.matching)
            setTotalUsers(json.totalUsers)
        }
        
        state.disposableCont != "" && fetchSearchedUsers()
    }, [state.disposableCont, page])

    return (
        <div className="searched">
            <h2 onClick={() => setActive(p => ({...p, others: null}))}>Go Back</h2>
            {totalUsers > 0 && <h1>Results: {totalUsers}</h1>}
            {totalUsers > 0 ?
                <div className="searched-users-cont">
                    {searchedUsers.map((users, i) => 
                        <div key={users._id}>
                            <h4>{i + 1}.</h4>
                            <h3>{users.email}</h3>
                        </div>
                    )}
                    {totalUsers > 10 &&
                        <span>
                            {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
                            {Math.ceil(totalUsers / 10) > page && <button onClick={() => setPage(page + 1)}>Next</button>}
                        </span>
                    }
                </div>
                :
                <h5>no result</h5>
            }
        </div>
    )
}
