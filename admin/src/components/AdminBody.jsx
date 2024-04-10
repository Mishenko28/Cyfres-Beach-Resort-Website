import AdminUserBody from "./adminBody/AdminUserBody"
import AdminUserSearched from "./adminBody/AdminUserSearched"

export default function AdminBody({ state, dispatch, active, setActive }) {
    return (
        <div className='body'>
            {!active.others &&
                active.sub == "users" && <AdminUserBody dispatch={dispatch} state={state} />
            }
            {active.others == "searched" && <AdminUserSearched state={state} dispatch={dispatch} setActive={setActive} />}
        </div>
    )
}
