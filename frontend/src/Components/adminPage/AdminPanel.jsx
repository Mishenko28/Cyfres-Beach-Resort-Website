import AdminDashboard from "./AdminPanelDashboard"
import AdminConfiguration from "./AdminPanelConfiguration"
import AdminUtilities from "./AdminPanelUtilities"
import AdminSettings from "./AdminPanelSettings"

export default function AdminPanel({ active, setActive, state, dispatch }) {

    const handleSelected = (type, sub) => {
        setActive({type, sub})
    }

    const styleActive = (target) => {
        return target ? { borderLeft: '6px solid #fff' } : null
    }

    const styleSubActive = (target) => {
        return target == active.sub ? {transform: 'translateX(18px)', backgroundColor: '#fff', color: '#000'} : null
    }

    const handleLogout = () => {
        localStorage.removeItem('admin')
        dispatch({type: "ADMIN_LOGOUT"})
    }


    return (
        <div className="panel-cont">
            <div className="top">
                <h1>CYFRES ADMIN</h1>
                <h2>{state.admin.admin}</h2>
            </div>
            <div className='middle'>
                <AdminDashboard
                    handleSelected={handleSelected} 
                    styleActive={styleActive}
                    styleSubActive={styleSubActive}
                />
                <AdminConfiguration
                    handleSelected={handleSelected} 
                    styleActive={styleActive}
                    styleSubActive={styleSubActive}
                />
                <AdminUtilities
                    handleSelected={handleSelected} 
                    styleActive={styleActive}
                    styleSubActive={styleSubActive}
                />
                <AdminSettings
                    handleSelected={handleSelected} 
                    styleActive={styleActive}
                    styleSubActive={styleSubActive}
                />
                
            </div>
            <div className="bottom">
                <div onClick={handleLogout} className="logout">
                    <i className="fa-solid fa-right-from-bracket" />
                    <h1>Logout</h1>
                </div>
            </div>
        </div>
    )
}
