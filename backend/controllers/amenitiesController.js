const Amenities = require('../models/amenitiesModel')

// GET ALL
const getAmenities = async (req, res) => {
    try {
        const amenities = await Amenities.find({})
        res.status(200).json({ amenities })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// GET SINGLE
const getAmenity = async (req, res) => {
    const { _id } = req.query

    try {
        const amenities = await Amenities.find({ _id })
        res.status(200).json({ amenities })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// ADD

const addAmenity = async (req, res) => {
    const { accommName, img, rate, caption } = req.body

    try {
        const match = await Amenities.findOne({ accommName })

        if (match) {
            throw new Error("Amenity already exist")
        }

        const newAmenity = await Amenities.create({ accommName: accommName.trim(), img, rate, caption: caption.trim() })
        res.status(200).json({ newAmenity })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT
const editAmenity = async (req, res) => {
    const { _id, accommName, img, rate, caption } = req.body

    try {
        const newAmenity = await Amenities.findOneAndUpdate({ _id }, { accommName: accommName.trim(), img, rate, caption: caption.trim() }, { new: true })
        res.status(200).json({ newAmenity })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE
const deleteAmenity = async (req, res) => {
    const { _id } = req.query

    try {
        const deletedAmenity = await Amenities.findOneAndDelete({ _id })
        res.status(200).json({ deletedAmenity })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAmenities,
    getAmenity,
    addAmenity,
    editAmenity,
    deleteAmenity
}