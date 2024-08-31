const { format } = require('date-fns')

const ongoingBooks = async (req, res, next) => {
    const date = new Date()

    const newDate = format(date, 'MMMM dd, uuuu / hh:mm aaa')
    next()
}

module.exports = ongoingBooks