import { useEffect, useState } from "react"
import useAdmin from "../../hooks/useAdmin"
import Confirmation from "../../components/Confirmation"
import AddAccommodation from "./Accommodation/AddAccommodation"
import EditAccommodation from "./Accommodation/EditAccommodation"

export default function Accommodations() {
    const [accommodations, setAccommodations] = useState([])
    const [accToDelete, setAccToDelete] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [isAdd, setIsAdd] = useState("")
    const [isEdit, setIsEdit] = useState(null)

    const { state, dispatch } = useAdmin()

    useEffect(() => {
        const fetchAccomms = async () => {
            setIsLoading(true)
            const response = await fetch(`${state.uri}/accommodation/all`, {
                headers: {
                    'Authorization': `Bearer ${state.admin.token}`
                }
            })

            const json = await response.json()

            if (json.error?.message == "jwt expired") {
                dispatch({ type: "EXPIRED" })
                return
            }

            setAccommodations(json.accommodations)
            setIsLoading(false)
        }

        fetchAccomms()
    }, [])

    const handleIsConfirmDelete = (acc) => {
        setIsConfirmDelete(true)
        setAccToDelete(acc)
    }

    const handleDelete = async (acc) => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/accommodation?_id=${acc._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${state.admin.token}`
            },
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setAccommodations(prev => prev.filter(acc => acc._id !== json.deletedAccommodation._id))
        setIsConfirmDelete(false)
        setIsLoading(false)
    }

    return (
        <div className="accommodation">
            {isLoading && <div className="loader"></div>}
            <div className="nav">
                <h2>Accommodations<i className="fa-solid fa-bed"></i></h2>
            </div>
            <div className="accommodation-body">
                <div className="accomm-cont">
                    <div className="head">
                        <h2>Rooms</h2>
                    </div>
                    <div className="categ">
                        <h2>image</h2>
                        <h2>room name</h2>
                        <h2>rate</h2>
                        <h2>max person</h2>
                        <h2>add person fee</h2>
                        <h2 className="caption">caption</h2>
                        <i className="fa-solid fa-square-plus" onClick={() => setIsAdd("room")}></i>
                    </div>
                    {accommodations.map(accommodation => accommodation.accommType == "room" &&
                        <div key={accommodation._id} className="accomm">
                            <img src={accommodation.img} />
                            <h2>{accommodation.accommName}</h2>
                            <h2>{accommodation.rate}</h2>
                            <h2>{accommodation.maxPerson}</h2>
                            <h2>{accommodation.addPersonRate}</h2>
                            <h2 className="caption">{accommodation.caption}</h2>
                            <div className="bttns">
                                <i className="fa-solid fa-square-pen" onClick={() => setIsEdit(accommodation)}></i>
                                <i className="fa-solid fa-trash" onClick={() => handleIsConfirmDelete(accommodation)}></i>
                            </div>
                        </div>
                    )}
                </div>
                <div className="accomm-cont">
                    <div className="head">
                        <h2>Cottages</h2>
                    </div>
                    <div className="categ">
                        <h2>image</h2>
                        <h2>room name</h2>
                        <h2>rate</h2>
                        <h2 className="caption">caption</h2>
                        <i className="fa-solid fa-square-plus" onClick={() => setIsAdd("cottage")}></i>
                    </div>
                    {accommodations.map(accommodation => accommodation.accommType == "cottage" &&
                        <div key={accommodation._id} className="accomm">
                            <img src={accommodation.img} />
                            <h2>{accommodation.accommName}</h2>
                            <h2>{accommodation.rate}</h2>
                            <h2 className="caption">{accommodation.caption}</h2>
                            <div className="bttns">
                                <i className="fa-solid fa-square-pen" onClick={() => setIsEdit(accommodation)}></i>
                                <i className="fa-solid fa-trash" onClick={() => handleIsConfirmDelete(accommodation)}></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isConfirmDelete &&
                <Confirmation
                    mssg={"Are you sure you want to delete this accommodation?"}
                    btn1={"Yes"}
                    btn1F={() => handleDelete(accToDelete)}
                    btn2={"No"}
                    btn2F={() => setIsConfirmDelete(false)}
                />
            }
            {isAdd && <AddAccommodation isAdd={isAdd} setIsAdd={setIsAdd} isLoading={isLoading} setIsLoading={setIsLoading} setAccommodations={setAccommodations} />}
            {isEdit && <EditAccommodation isEdit={isEdit} setIsEdit={setIsEdit} isLoading={isLoading} setIsLoading={setIsLoading} setAccommodations={setAccommodations} />}
        </div>
    )
}
