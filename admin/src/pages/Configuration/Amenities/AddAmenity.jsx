import { useState } from "react"
import useAdmin from "../../../hooks/useAdmin"

export default function AddAccommodation({ isAdd, setIsAdd, isLoading, setIsLoading, setAmenities }) {
    const { state, dispatch } = useAdmin()
    const [emptyTogg, setEmptyTogg] = useState(false)
    const [newAmenity, setNewAmenity] = useState({
        accommName: "",
        img: "",
        rate: 0,
        caption: ""
    })

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
                .then(base64 => setNewAmenity(p => ({ ...p, img: base64 })))
        } else {
            setNewAmenity(prev => ({ ...prev, img: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmptyTogg(true)

        if (newAmenity.accommName.trim() == '' ||
            newAmenity.img == '' ||
            newAmenity.rate == 0 ||
            newAmenity.caption.trim() == '') {
            return
        }
        setIsLoading(true)

        const response = await fetch(`${state.uri}/amenities`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.admin.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAmenity)
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setAmenities(prev => [...prev, json.newAmenity])
        setIsAdd(false)
        setIsLoading(false)
    }


    return (
        <div className="blur-cont">
            <form className="add-accomm-cont">
                <h3>ADD AMENITY</h3>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAmenity.accommName.trim() == '' && 'empty'}>Amenity Name:</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewAmenity(p => ({ ...p, accommName: e.target.value }))}
                        value={newAmenity.accommName}
                    />
                </div>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAmenity.img.trim() == '' && 'empty'}>Image:</h2>
                    <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => handleChangeImage(e.target.files[0])}
                    />
                </div>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAmenity.rate == 0 && 'empty'}>Rate:</h2>
                    <input
                        type="number"
                        onChange={(e) => setNewAmenity(p => ({ ...p, rate: e.target.value }))}
                        value={newAmenity.rate}
                    />
                </div>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAmenity.caption == '' && 'empty'}>Caption:</h2>
                    <textarea
                        onChange={(e) => setNewAmenity(p => ({ ...p, caption: e.target.value }))}
                        value={newAmenity.caption}
                    />
                </div>
                <div className="bttns">
                    <button disabled={isLoading} onClick={handleSubmit}>Save</button>
                    <button disabled={isLoading} onClick={() => setIsAdd(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
