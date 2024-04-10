import { useGlobalContext } from '../hooks/useGlobalContext'
import React, { useState } from 'react'

import AdminPanel from '../components/AdminPanel'
import AdminNav from '../components/AdminNav'
import AdminBody from '../components/AdminBody'

export default function Admin() {
    const { state, dispatch } = useGlobalContext()

    const [active, setActive] = useState({type: null, sub: null, others: null})

    return (
        <div className="admin">
            <AdminPanel
                active={active}
                setActive={setActive}
                state={state}
                dispatch={dispatch} 
            />
            <AdminNav
                state={state}
                dispatch={dispatch}
                active={active}
                setActive={setActive}/>
            <AdminBody
                state={state}
                dispatch={dispatch}
                active={active}
                setActive={setActive}
            />
        </div>
    )
}