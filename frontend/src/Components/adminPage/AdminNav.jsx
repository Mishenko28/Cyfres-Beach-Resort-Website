import AdminUserNav from "./AdminUserNav"

export default function AdminNav({ active }) {
    return (
        <div className='nav-cont'>
            {active.type ?
                <>
                    {active.type == "dash" && <AdminUserNav />}
                    {active.type == "config" && <h1>CONFIGURATION</h1>}
                    {active.type == "util" && <h1>UTILITIES</h1>}
                    {active.type == "sett" && <h1>SETTINGS</h1>}
                </>
                :
                <h1>Welcome to ADMIN Page</h1>
            }
        </div>
    )
}
