import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, admin: action.payload }
        case "LOGOUT":
            return { ...state, admin: null }
        case "SET_DISPO":
            return { ...state, disposableCont: action.payload }
        case "CLEAR_DISPO":
            return { ...state, disposableCont: null }
        default:
            return state
    }
}

export default function GlobalContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        admin: null,
        disposableCont: null
    })

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('admin'))
        
        if (admin) {
            dispatch({type:"LOGIN", payload: admin})
        }

    }, [])

    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}