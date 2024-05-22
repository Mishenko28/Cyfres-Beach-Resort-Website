const Book = require('../models/bookModel')
const BookCancelled = require('../models/bookCancelledModel')
const BookConfirmed = require('../models/bookConfirmedModel')

const addBooking = async (req, res) => {
    const { _id, total, dateIn, dateOut, question, selected } = req.body

    try {
        const book = await Book.create({ userId: _id, total, dateIn, dateOut, question, slctRoom: selected })

        res.status(200).json({ book })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getBookings = async (req, res) => {
    const { _id } = req.query

    try {
        const books = await Book.find({ userId: _id })

        res.status(200).json({ books })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const cancelBook = async (req, res) => {
    const { book, reason } = req.body

    try {
        await BookCancelled.create({ userId: book.userId, book, reason })
        const bookCancel = await Book.findOneAndDelete({ _id: book._id })

        res.status(200).json({ bookCancel })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPendings = async (req, res) => {
    try {
        const pendings = await Book.find({ status: "Pending" })
        res.status(200).json({ pendings })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const confirmBook = async (req, res) => {
    const { _id, userId, dateIn, dateOut, question, slctRoom, deposit, balance } = req.body

    try {
        const bookConfirm = await BookConfirmed.create({ userId, dateIn, dateOut, question, slctRoom, deposit, balance })
        await Book.findOneAndUpdate({ _id }, { status: 'Confirmed' })

        if (bookConfirm) {
            res.status(200).json({ _id })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    addBooking,
    getBookings,
    cancelBook,
    getPendings,
    confirmBook
}