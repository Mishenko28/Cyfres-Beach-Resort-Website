import { useState, useEffect } from "react"
import useAdmin from "../../../hooks/useAdmin"

export default function AddEditDeletePicture({ setIsAddPic, setPicToEdit, picToEdit, setIsLoading, setPictures }) {
    const [picture, setPicture] = useState({
        caption: "",
        img: ""
    })

    const { state, dispatch } = useAdmin()

    const [error, setError] = useState("")
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        picToEdit && setPicture({
            caption: picToEdit.caption,
            img: picToEdit.img
        })
    }, [])

    useEffect(() => {
        setIsChanged(false)
        picToEdit?.caption !== picture.caption && setIsChanged(true)
        picToEdit?.img !== picture.img && setIsChanged(true)
    }, [picture])

    const handleCancel = () => {
        setIsAddPic(false)
        setPicToEdit(null)
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onloadend = () => {
                resolve(reader.result)
            }

            reader.onerror = () => {
                reject(new Error('Failed to convert image to Base64'))
            }

            reader.readAsDataURL(file)
        })
    }

    const handleChangeImage = (file) => {
        if (file) {
            convertToBase64(file)
                .then(base64 => setPicture(p => ({ ...p, img: base64 })))
        } else {
            setPicture(prev => ({ ...prev, img: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await fetch(`${state.uri}/gallery`, {
            method: picToEdit ? 'PATCH' : 'POST',
            headers: {
                Authorization: `Bearer ${state.admin.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(picToEdit ? { ...picture, _id: picToEdit._id } : { ...picture })
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        } else if (json.error) {
            setError(json.error)
            setIsLoading(false)
            return
        }

        if (picToEdit) {
            setPictures(prev => prev.map(pic => pic._id == json.newGallery._id ? json.newGallery : pic))
            setPicToEdit(null)
        } else {
            setPictures(prev => [...prev, json.newGallery])
            setIsAddPic(false)
        }

        setIsLoading(false)
    }

    const handleDelete = async () => {
        setIsLoading(true)

        const response = await fetch(`${state.uri}/gallery?_id=${picToEdit._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${state.admin.token}`
            }
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setPictures(prev => prev.filter(pic => pic._id !== json.deletedGallery._id))
        setPicToEdit(null)

        setIsLoading(false)
    }

    return (
        <div className="blur-cont">
            <form className="add-edit-delete-cont" onSubmit={handleSubmit}>
                <h2>{picToEdit ? "EDIT" : "ADD"} PICTURE</h2>
                <div className="image">
                    <h1>Image:</h1>
                    <img src={picture.img} />
                    <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => handleChangeImage(e.target.files[0])}
                    />
                </div>
                <div className="caption">
                    <h1>Caption (30 maximum characters) :</h1>
                    <input type="text" value={picture.caption} onChange={(e) => setPicture(p => e.target.value.length <= 30 ? ({ ...p, caption: e.target.value }) : p)} />
                </div>
                {error && <div className="error"><h2>Error: {error}</h2></div>}
                <div className="bttns">
                    <button disabled={!isChanged} >Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    {picToEdit && <i className="fa-solid fa-trash" onClick={handleDelete}></i>}
                </div>
            </form>
        </div>
    )
}
