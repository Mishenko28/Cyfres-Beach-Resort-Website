import { useState, useEffect } from 'react'
import useAdmin from "../../hooks/useAdmin"
import Confirmation from "../../components/Confirmation"
import AddAmenity from "./Amenities/AddAmenity"
import EditAmenity from "./Amenities/EditAmenity"

export default function Amenities() {
    const [amenities, setAmenities] = useState([])
    const [accToDelete, setAccToDelete] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(null)

    const { state, dispatch } = useAdmin()

    useEffect(() => {
        const fetchAmenities = async () => {
            setIsLoading(true)
            const response = await fetch(`${state.uri}/amenities/all`, {
                headers: {
                    'Authorization': `Bearer ${state.admin.token}`
                }
            })

            const json = await response.json()

            if (json.error?.message == "jwt expired") {
                dispatch({ type: "EXPIRED" })
                return
            }
            setAmenities(json.amenities)
            setIsLoading(false)
        }

        fetchAmenities()
    }, [])

    const handleIsConfirmDelete = (acc) => {
        setIsConfirmDelete(true)
        setAccToDelete(acc)
    }

    const handleDelete = async (acc) => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/amenities?_id=${acc._id}`, {
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

        setAmenities(prev => prev.filter(acc => acc._id !== json.deletedAmenity._id))
        setIsConfirmDelete(false)
        setIsLoading(false)
    }

    return (
        <div className="amenities">
            {isLoading && <div className="loader"></div>}
            <div className="nav">
                <h2>Amenities<i className="fa-solid fa-umbrella-beach"></i></h2>
            </div>
            <div className="amenities-body">
                <div className="categ">
                    <h2>image</h2>
                    <h2>amenity name</h2>
                    <h2>rate</h2>
                    <h2 className="caption">caption</h2>
                    <i className="fa-solid fa-square-plus" onClick={() => setIsAdd(true)}></i>
                </div>
                {amenities.map(amenity => (
                    <div key={amenity._id} className="amenity">
                        <img src={amenity.img} />
                        <h2>{amenity.accommName}</h2>
                        <h2>{amenity.rate}</h2>
                        <h2 className="caption">{amenity.caption}</h2>
                        <div className="bttns">
                            <i className="fa-solid fa-square-pen" onClick={() => setIsEdit(amenity)}></i>
                            <i className="fa-solid fa-trash" onClick={() => handleIsConfirmDelete(amenity)}></i>
                        </div>
                    </div>
                ))}
            </div>
            {isConfirmDelete &&
                <Confirmation
                    mssg={"Are you sure you want to delete this amenity?"}
                    btn1={"Yes"}
                    btn1F={() => handleDelete(accToDelete)}
                    btn2={"No"}
                    btn2F={() => setIsConfirmDelete(false)}
                />
            }
            {isAdd && <AddAmenity isAdd={isAdd} setIsAdd={setIsAdd} isLoading={isLoading} setIsLoading={setIsLoading} setAmenities={setAmenities} />}
            {isEdit && <EditAmenity isEdit={isEdit} setIsEdit={setIsEdit} isLoading={isLoading} setIsLoading={setIsLoading} setAmenities={setAmenities} />}
        </div>
    )
}
