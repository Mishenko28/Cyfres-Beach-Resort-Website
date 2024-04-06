import AdminUserNav from "./adminNav/AdminUserNav"

export default function AdminNav({ active, setActive }) {
    return (
        <div className='nav-cont'>
            {active.type ?
                <>
                    {active.type == "dash" && <AdminUserNav setActive={setActive}/>}
                    {active.type == "config" && <h1>CONFIGURATION</h1>}
                    {active.type == "util" && <h1>UTILITIES</h1>}
                    {active.type == "sett" && <h1>SETTINGS</h1>}
                </>
                :
                <h1 className="welcome"><i className="fa-solid fa-user-tie" />Welcome to <b>ADMIN</b> Page</h1>
            }
        </div>
    )
}
