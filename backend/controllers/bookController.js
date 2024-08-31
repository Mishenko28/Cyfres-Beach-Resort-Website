const { format } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

const Book = require('../models/bookModel')
const BookCancelled = require('../models/bookCancelledModel')
const BookConfirmed = require('../models/bookConfirmedModel')


// BOOK
const addBooking = async (req, res) => {
    const { _id, total, dateIn, dateOut, question, selected } = req.body
    const deposit = total * 0.5

    try {
        const book = await Book.create({ userId: _id, total, deposit, dateIn, dateOut, question, slctRoom: selected })

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
// END



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

const confirmBook = async (req, res) => {
    const { _id, userId, dateIn, dateOut, question, slctRoom, deposit, total } = req.body

    try {
        const bookConfirm = await BookConfirmed.create({ userId, dateIn, dateOut, question, slctRoom, deposit, total })
        await Book.findOneAndUpdate({ _id }, { status: 'Confirmed', dateIn, dateOut, deposit, total, slctRoom, })

        if (bookConfirm) {
            res.status(200).json({ _id })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT
const editConfirmBook = async (req, res) => {
    const { _id, userId, dateIn, dateOut, question, slctRoom, deposit, total } = req.body

    try {
        const newConfirmBook = await BookConfirmed.findOneAndUpdate({ _id, }, { userId, dateIn, dateOut, question, slctRoom, deposit, total }, { new: true })

        res.status(200).json(newConfirmBook)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// END



// GET
const getPendings = async (req, res) => {
    try {
        const pendings = await Book.find({ status: "Pending" })
        res.status(200).json({ pendings })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCancelled = async (req, res) => {
    try {
        const cancelled = await BookCancelled.find({})
        res.status(200).json({ cancelled })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getConfirmed = async (req, res) => {
    try {
        const confirmed = await BookConfirmed.find({})
        res.status(200).json({ confirmed })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// END

const getDate = async (req, res) => {
    const date = format(utcToZonedTime(new Date(), 'Asia/Manila'), 'MMMM dd, uuuu / hh:mm aaa', { timeZone: 'Asia/Manila' })
    try {
        res.status(200).json({ date })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    addBooking,
    getBookings,
    cancelBook,
    getPendings,
    confirmBook,
    getCancelled,
    getConfirmed,
    editConfirmBook,
    getDate
}