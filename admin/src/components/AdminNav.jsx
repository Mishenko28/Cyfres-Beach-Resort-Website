import AdminUserNav from "./adminNav/AdminUserNav"

export default function AdminNav({ state, dispatch, active, setActive }) {
    return (
        <div className='nav-cont'>
            {active.type ?
                <>
                    {active.type == "dash" && <h1>DASHBOARD</h1>}
                    {active.type == "config" && <AdminUserNav state={state} dispatch={dispatch} setActive={setActive}/>}
                    {active.type == "util" && <h1>UTILITIES</h1>}
                    {active.type == "sett" && <h1>SETTINGS</h1>}
                </>
                :
                <h1 className="welcome"><i className="fa-solid fa-user-tie" />Welcome to <b>ADMIN</b> Page</h1>
            }
        </div>
    )
}
