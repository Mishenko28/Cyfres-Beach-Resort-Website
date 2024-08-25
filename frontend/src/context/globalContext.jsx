import { URI } from "../../../debug"
import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state
    }
}

export default function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        uri: URI
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