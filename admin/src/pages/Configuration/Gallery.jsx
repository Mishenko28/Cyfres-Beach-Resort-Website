import { useState, useEffect, useRef } from 'react'
import useAdmin from '../../hooks/useAdmin'
import AddEditDeletePicture from './Gallery/AddEditDeletePicture'


export default function Gallery() {
    const { state, dispatch } = useAdmin()

    const [isLoading, setIsLoading] = useState(false)
    const [pictures, setPictures] = useState([])
    const [isAddPic, setIsAddPic] = useState(false)
    const [picToEdit, setPicToEdit] = useState(null)

    const picRef = useRef()

    useEffect(() => {
        fetchPics()
    }, [state])

    useEffect(() => {
        const eventHandler = (e) => {
            picRef.current = e.target
        }

        window.addEventListener("mousemove", eventHandler)

        return () => {
            window.removeEventListener("mousemove", eventHandler)
        }
    }, [])


    const fetchPics = async () => {
        setIsLoading(true)
        const response = await fetch(`${state.uri}/gallery/all`, {
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setPictures(json.galleries)
        setIsLoading(false)
    }

    const handleAddPicBtn = () => {
        setIsAddPic(true)
    }

    const handleEditPic = (pic) => {
        setPicToEdit(pic)
    }

    return (
        <div className="gallery">
            {isLoading && <div className="loader"></div>}
            <div className="nav">
                <h2>Gallery<i className="fa-solid fa-image"></i></h2>
                <i className="fa-solid fa-square-plus" onClick={handleAddPicBtn} />
            </div>
            <div className='galleries-body'>
                {pictures.map(picture => (
                    <div key={picture._id} className='picture' onClick={() => handleEditPic(picture)} >
                        <img src={picture.img} />
                        <h1>{picture.caption}</h1>
                    </div>
                ))}
            </div>
            {(picToEdit || isAddPic) && <AddEditDeletePicture
                picToEdit={picToEdit}
                setPicToEdit={setPicToEdit}
                setIsAddPic={setIsAddPic}
                setIsLoading={setIsLoading}
                setPictures={setPictures}
            />}
        </div>
    )
}
