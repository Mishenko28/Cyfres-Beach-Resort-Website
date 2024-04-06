import { useEffect, useState, useRef } from "react"
import { useGlobalContext } from '../../../hooks/useGlobalContext'

export default function AdminUserNav({ setActive }) {
    const { dispatch } = useGlobalContext()

    const [searchUser, setSearchUser] = useState("")
    const [matchingUser, setMatchingUser] = useState([])
    const searchRef = useRef(null)

    useEffect(() => {
        const fetchMatchingItem = async () =>{
            const response = await fetch(`http://localhost:5000/database/users/search?user=${searchUser}&returnedNumUser=12`)

            const json = await response.json()
            
            response.ok && setMatchingUser(json.matching)
        }

        searchUser != "" && fetchMatchingItem()

    }, [searchUser])

    useEffect(() => {
        const clickedElement = (e) => {
            searchRef.current != e.target && setMatchingUser([])
        }

        window.addEventListener('click', clickedElement)

        return () => {
            window.removeEventListener('click', clickedElement)
            dispatch({type: "CLEAR_DISPO"})
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        setActive(p => ({...p, others: "searched"}))
        dispatch({type: "SET_DISPO", payload: searchUser})
    }
    
    return (
        <div className="users">
            <h1 className="heading">DASHBOARD</h1>
            <div className="search">
                <form onSubmit={handleSearch}>
                    <input ref={searchRef} value={searchUser} onChange={e => setSearchUser(e.target.value.trim())} type="text" placeholder="search user..."/>
                    <button><i className="fa-solid fa-magnifying-glass" /></button>
                </form>
                {matchingUser.length > 0 &&
                    <div className="search-items">
                        {matchingUser.map(item => <h1 key={item._id}>{item.email}</h1>)}
                    </div>
                }
            </div>
        </div>
    )
}
