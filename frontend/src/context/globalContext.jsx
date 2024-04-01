import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, user: action.payload }
        case "USER_LOGOUT":
            return { ...state, user: null }
        case "ADMIN_LOGIN":
            return { ...state, admin: action.payload }
        case "ADMIN_LOGOUT":
            return { ...state, admin: null }
        default:
            return state
    }
}

export default function GlobalContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        admin: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const admin = JSON.parse(localStorage.getItem('admin'))
        
        if (admin) {
            dispatch({type:"ADMIN_LOGIN", payload: admin})
        } else if (user) {
            dispatch({type:"USER_LOGIN", payload: user})
        }

    }, [])

    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}