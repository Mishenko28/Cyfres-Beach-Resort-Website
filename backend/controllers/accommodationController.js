const Accomm = require('../models/accommodationModel')


// GET ALL
const getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accomm.find({})
        res.status(200).json({ accommodations })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// GET SINGLE
const getAccommodation = async (req, res) => {
    const { _id } = req.query

    try {
        const accommodations = await Accomm.find({ _id })
        res.status(200).json({ accommodations })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// ADD
const addAccommodation = async (req, res) => {
    const { accommType, accommName, img, maxPerson, rate, addPersonRate, caption } = req.body

    try {
        const match = await Accomm.findOne({ accommName })

        if (match) {
            throw new Error("Accommodation already exist")
        }

        const newAccommodation = await Accomm.create({ accommType, accommName: accommName.trim(), img, maxPerson, rate, addPersonRate, caption: caption.trim() })
        res.status(200).json({ newAccommodation })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT
const editAccommodation = async (req, res) => {
    const { _id, accommType, accommName, img, maxPerson, rate, addPersonRate, caption } = req.body

    try {
        const newAccommodation = await Accomm.findOneAndUpdate({ _id }, { accommType, accommName: accommName.trim(), img, maxPerson, rate, addPersonRate, caption: caption.trim() }, { new: true })
        res.status(200).json({ newAccommodation })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE
const deleteAccommodation = async (req, res) => {
    const { _id } = req.query

    try {
        const deletedAccommodation = await Accomm.findOneAndDelete({ _id })
        res.status(200).json({ deletedAccommodation })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getAccommodations,
    getAccommodation,
    addAccommodation,
    editAccommodation,
    deleteAccommodation
}