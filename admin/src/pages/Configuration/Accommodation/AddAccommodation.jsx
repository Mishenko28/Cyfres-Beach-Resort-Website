import { useState } from "react"
import useAdmin from "../../../hooks/useAdmin"

export default function AddAccommodation({ isAdd, setIsAdd, isLoading, setIsLoading, setAccommodations }) {
    const { state, dispatch } = useAdmin()
    const [emptyTogg, setEmptyTogg] = useState(false)
    const [newAccomm, setNewAccomm] = useState({
        accommType: isAdd,
        accommName: "",
        img: "",
        maxPerson: 0,
        rate: 0,
        addPersonRate: 0,
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
                .then(base64 => setNewAccomm(p => ({ ...p, img: base64 })))
        } else {
            setNewAccomm(prev => ({ ...prev, img: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmptyTogg(true)

        if (newAccomm.accommName.trim() == '' ||
            newAccomm.img == '' ||
            newAccomm.rate == 0 ||
            newAccomm.caption.trim() == '') {
            return
        }
        if (isAdd == 'room' && (newAccomm.maxPerson == 0 || newAccomm.addPersonRate == 0)) {
            return
        }
        setIsLoading(true)

        const response = await fetch(`${state.uri}/accommodation`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.admin.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccomm)
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setAccommodations(prev => [...prev, json.newAccommodation])
        setIsAdd("")
        setIsLoading(false)
    }


    return (
        <div className="blur-cont">
            <form className="add-accomm-cont">
                <h3>ADD {isAdd.toUpperCase()}</h3>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAccomm.accommName.trim() == '' && 'empty'}>{isAdd[0].toUpperCase() + isAdd.slice(1)} name:</h2>
                    <input
                        type="text"
                        onChange={(e) => setNewAccomm(p => ({ ...p, accommName: e.target.value }))}
                        value={newAccomm.accommName}
                    />
                </div>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAccomm.img.trim() == '' && 'empty'}>Image:</h2>
                    <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => handleChangeImage(e.target.files[0])}
                    />
                </div>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAccomm.rate == 0 && 'empty'}>Rate:</h2>
                    <input
                        type="number"
                        onChange={(e) => setNewAccomm(p => ({ ...p, rate: e.target.value }))}
                        value={newAccomm.rate}
                    />
                </div>
                {isAdd == "room" &&
                    <>
                        <div className="input_cont">
                            <h2 className={emptyTogg && newAccomm.maxPerson == 0 && 'empty'}>Max Person:</h2>
                            <input
                                type="number"
                                onChange={(e) => setNewAccomm(p => ({ ...p, maxPerson: e.target.value }))}
                                value={newAccomm.maxPerson}
                            />
                        </div>
                        <div className="input_cont">
                            <h2 className={emptyTogg && newAccomm.addPersonRate == 0 && 'empty'}>Add Person Fee:</h2>
                            <input
                                type="number"
                                onChange={(e) => setNewAccomm(p => ({ ...p, addPersonRate: e.target.value }))}
                                value={newAccomm.addPersonRate}
                            />
                        </div>
                    </>
                }
                <div className="input_cont">
                    <h2 className={emptyTogg && newAccomm.caption == '' && 'empty'}>Caption:</h2>
                    <textarea
                        onChange={(e) => setNewAccomm(p => ({ ...p, caption: e.target.value }))}
                        value={newAccomm.caption}
                    />
                </div>
                <div className="bttns">
                    <button disabled={isLoading} onClick={handleSubmit}>Save</button>
                    <button disabled={isLoading} onClick={() => setIsAdd("")}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
