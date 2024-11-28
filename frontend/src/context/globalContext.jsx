import { URI } from "../../../debug"
import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        case "DATE":
            return { ...state, date: action.payload }
        default:
            return state
    }
}

export default function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        uri: URI,
        date: {
            in: new Date().toISOString().split('T')[0],
            out: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
        }
    })

    useEffect(() => {
        const loginUser = () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                dispatch({ type: "LOGIN", payload: user })
            }
        }

        loginUser()
    }, [])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}