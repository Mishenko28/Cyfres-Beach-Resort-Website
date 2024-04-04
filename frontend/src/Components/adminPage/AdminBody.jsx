import AdminUserBody from "./AdminUserBody"

export default function AdminBody({ active, setActive }) {
    return (
        <div className='body'>
            {active.sub == "users" && <AdminUserBody />}
        </div>
    )
}
