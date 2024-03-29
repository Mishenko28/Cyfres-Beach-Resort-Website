import { createContext, useReducer, useEffect } from "react"

export const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export default function GlobalContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {
        user: null
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