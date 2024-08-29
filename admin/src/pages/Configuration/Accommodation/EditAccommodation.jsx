import { useEffect, useState } from "react"
import useAdmin from "../../../hooks/useAdmin"

export default function EditAccommodation({ isEdit, setIsEdit, isLoading, setIsLoading, setAccommodations }) {
    const { state, dispatch } = useAdmin()
    const [emptyTogg, setEmptyTogg] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [newAccomm, setNewAccomm] = useState({
        accommType: isEdit.accommType,
        accommName: isEdit.accommName,
        img: isEdit.img,
        maxPerson: isEdit.maxPerson,
        rate: isEdit.rate,
        addPersonRate: isEdit.addPersonRate,
        caption: isEdit.caption
    })

    useEffect(() => {
        setIsChanged(handleIsChanged)
    }, [newAccomm])

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
            newAccomm.caption.trim() == ''
        ) {
            return
        }

        if (isEdit.accommType == 'room' && (newAccomm.maxPerson == 0 || newAccomm.addPersonRate == 0)) {
            return
        }

        if (!isChanged) {
            return
        }

        setIsLoading(true)

        const response = await fetch(`${state.uri}/accommodation`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${state.admin.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: isEdit._id, ...newAccomm })
        })

        const json = await response.json()

        if (json.error?.message == "jwt expired") {
            dispatch({ type: "EXPIRED" })
            return
        }

        setAccommodations(prev => prev.map(acc => acc._id == json.newAccommodation._id ? json.newAccommodation : acc))
        setIsEdit(null)
        setIsLoading(false)
    }

    const handleIsChanged = () => {
        let isChanged = false

        newAccomm.accommName.trim() !== isEdit.accommName && (isChanged = true)
        newAccomm.img !== isEdit.img && (isChanged = true)
        newAccomm.maxPerson !== isEdit.maxPerson && (isChanged = true)
        newAccomm.rate !== isEdit.rate && (isChanged = true)
        newAccomm.addPersonRate !== isEdit.addPersonRate && (isChanged = true)
        newAccomm.caption.trim() !== isEdit.caption && (isChanged = true)

        return isChanged
    }

    return (
        <div className="blur-cont">
            <form className="add-accomm-cont">
                <h3>EDIT {isEdit.accommType.toUpperCase()}</h3>
                <div className="input_cont">
                    <h2 className={emptyTogg && newAccomm.accommName.trim() == '' && 'empty'}>{isEdit.accommType[0].toUpperCase() + isEdit.accommType.slice(1)} name:</h2>
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
                {isEdit.accommType == "room" &&
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
                    <button style={isChanged ? null : { backgroundColor: '#555', cursor: "not-allowed" }} disabled={isLoading} onClick={handleSubmit}>Save</button>
                    <button disabled={isLoading} onClick={() => setIsEdit(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
