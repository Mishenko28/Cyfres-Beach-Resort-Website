const moment = require('moment-timezone')

const Book = require('../models/bookModel')
const BookCancelled = require('../models/bookCancelledModel')
const BookConfirmed = require('../models/bookConfirmedModel')
const BookOngoing = require('../models/bookOngoingModel')




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
        const bookConfirm = await BookConfirmed.create({ bookId: _id, userId, dateIn, dateOut, question, slctRoom, deposit, total })
        await Book.findOneAndUpdate({ _id }, { status: 'Confirmed', dateIn, dateOut, deposit, total, slctRoom, })

        if (bookConfirm) {
            res.status(200).json({ _id })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT CONFIRM BOOK
const editConfirmBook = async (req, res) => {
    const { _id, bookId, userId, dateIn, dateOut, question, slctRoom, deposit, total } = req.body

    try {
        const newBook = await BookConfirmed.findOneAndUpdate({ _id, }, { userId, dateIn, dateOut, question, slctRoom, deposit, total }, { new: true })
        await Book.findOneAndUpdate({ _id: bookId }, { dateIn, dateOut, deposit, total, slctRoom, })

        res.status(200).json(newBook)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// EDIT ONGOING BOOK
const editOngoingBook = async (req, res) => {
    const { _id, bookId, userId, dateIn, dateOut, question, slctRoom, deposit, total } = req.body

    try {
        const newBook = await BookOngoing.findOneAndUpdate({ _id, }, { userId, dateIn, dateOut, question, slctRoom, deposit, total }, { new: true })
        await Book.findOneAndUpdate({ _id: bookId }, { dateIn, dateOut, deposit, total, slctRoom, })

        res.status(200).json(newBook)
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
        await setOngoingBooks()

        const confirmed = await BookConfirmed.find({})
        res.status(200).json({ confirmed })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getOngoing = async (req, res) => {
    try {
        await setOngoingBooks()

        const ongoing = await BookOngoing.find({})
        res.status(200).json({ ongoing })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// END

const setOngoingBooks = async () => {
    const dateNow = moment().tz('Asia/Manila')
    const books = await BookConfirmed.find({})

    await Promise.all(books.map(async book => {
        book.dateIn.setHours(8)
        book.dateOut.setHours(8)

        const isOnGoing = dateNow.isSameOrAfter(book.dateIn)

        if (isOnGoing) {
            await BookOngoing.create({
                bookId: book.bookId,
                userId: book.userId,
                dateIn: book.dateIn,
                dateOut: book.dateOut,
                question: book.question,
                slctRoom: book.slctRoom,
                total: book.total,
                deposit: book.deposit
            })
            await Book.findOneAndUpdate({ _id: book.bookId }, { status: 'On Going' })
            await BookConfirmed.findOneAndDelete({ _id: book._id })
        }
    }))
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
    getOngoing,
    editOngoingBook
}