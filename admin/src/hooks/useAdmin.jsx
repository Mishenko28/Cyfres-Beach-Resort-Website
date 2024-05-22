import { createContext, useContext, useReducer, useEffect } from "react"

const AdminContext = createContext()

export default function useAdmin() {
    return useContext(AdminContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('cyfresAdmin', JSON.stringify(action.payload))
            return { ...state, admin: { ...state.admin, ...action.payload } }
        case "LOGOUT":
            localStorage.removeItem('cyfresAdmin')
            return { ...state, admin: { expired: false } }
        case "REFRESH":
            localStorage.removeItem('cyfresAdmin')
            localStorage.setItem('cyfresAdmin', JSON.stringify({ email: state.admin.email, token: action.payload }))
            return { ...state, admin: { ...state.admin, expired: false, token: action.payload } }
        case "EXPIRED":
            return { ...state, admin: { ...state.admin, expired: true } }
        default:
            return state
    }
}

export function AdminContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        admin: { expired: false },
        uri: "http://localhost:5000"
    })
    // DEV      "http://localhost:5000"
    // SERVER   "https://cyfres-beach-resort-api.onrender.com"

    useEffect(() => {
        const admin = localStorage.getItem('cyfresAdmin')
        admin && dispatch({ type: "LOGIN", payload: JSON.parse(admin) })
    }, [])

    const fetchNewToken = async () => {
        const response = await fetch(`${state.uri}/refresh-token`, {
            headers: {
                'Authorization': `Bearer ${state.admin.token}`
            }
        })

        const json = await response.json()
        dispatch({ type: "REFRESH", payload: json.newToken })
    }

    return (
        <AdminContext.Provider value={{ state, dispatch, fetchNewToken }}>
            {children}
        </AdminContext.Provider>
    );
}
