const Gallery = require('../models/galleryModel')

// GET ALL
const getGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find({})
        res.status(200).json({ galleries })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// GET SINGLE
const getGallery = async (req, res) => {
    const { _id } = req.query

    try {
        const gallery = await Gallery.find({ _id })
        res.status(200).json({ gallery })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// ADD
const addGallery = async (req, res) => {
    const { caption, img } = req.body

    try {
        if (!caption && !img) {
            throw new Error("caption and image is required")
        }

        if (!caption) {
            throw new Error("caption is required")
        }

        if (!img) {
            throw new Error("image is required")
        }

        const match = await Gallery.findOne({ img })

        if (match) {
            throw new Error("The picture already exist")
        }

        const newGallery = await Gallery.create({ img, caption: caption.trim() })
        res.status(200).json({ newGallery })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT
const editGallery = async (req, res) => {
    const { _id, img, caption } = req.body

    try {
        if (!caption && !img) {
            throw new Error("caption and image is required")
        }

        if (!caption) {
            throw new Error("caption is required")
        }

        if (!img) {
            throw new Error("image is required")
        }

        const match = await Gallery.findOne({ img })

        if (match && match._id != _id) {
            throw new Error("The picture already exist")
        }

        const newGallery = await Gallery.findOneAndUpdate({ _id }, { img, caption: caption.trim() }, { new: true })
        res.status(200).json({ newGallery })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE
const deleteGallery = async (req, res) => {
    const { _id } = req.query

    try {
        const deletedGallery = await Gallery.findOneAndDelete({ _id })
        res.status(200).json({ deletedGallery })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getGalleries,
    getGallery,
    addGallery,
    editGallery,
    deleteGallery
}