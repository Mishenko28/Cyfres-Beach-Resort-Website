import AdminUserBody from "./adminBody/AdminUserBody"
import AdminUserSearched from "./adminBody/AdminUserSearched"

export default function AdminBody({ active, setActive }) {
    return (
        <div className='body'>
            {!active.others &&
                active.sub == "users" && <AdminUserBody />
            }
            {active.others == "searched" && <AdminUserSearched setActive={setActive} />}
        </div>
    )
}
