const Accomm = require('../models/accommodationModel')
const Amenities = require('../models/amenitiesModel')
const Gallery = require('../models/galleryModel')


const getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accomm.find({})
            .sort({ accommType: { $eq: 'room' } ? -1 : 1 })

        res.status(200).json({ accommodations })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAmenities = async (req, res) => {
    try {
        const amenities = await Amenities.find({})
        res.status(200).json({ amenities })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find({})
        res.status(200).json({ galleries })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAccommodations,
    getAmenities,
    getGalleries
}