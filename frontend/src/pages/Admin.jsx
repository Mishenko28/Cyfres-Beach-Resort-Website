import { useGlobalContext } from '../hooks/useGlobalContext'
import '../styles/admin.css'
import React, { useState } from 'react'

import AdminPanel from '../Components/adminPage/AdminPanel'
import AdminNav from '../Components/adminPage/AdminNav'
import AdminBody from '../Components/adminPage/AdminBody'

export default function Admin() {
    const { state, dispatch } = useGlobalContext()

    const [active, setActive] = useState({type: null, sub: null})

    return (
        <div className="admin">
            <AdminPanel
                active={active}
                setActive={setActive}
                state={state}
                dispatch={dispatch} 
            />
            <AdminNav active={active} />
            <AdminBody
                active={active}
                setActive={setActive}
            />
        </div>
    )
}