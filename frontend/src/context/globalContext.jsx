import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
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
        user: null,
        disposableCont: null,
        uri: "https://cyfres-beach-resort-api.onrender.com"
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if (user) {
            dispatch({type:"LOGIN", payload: user})
        }

    }, [])

    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}