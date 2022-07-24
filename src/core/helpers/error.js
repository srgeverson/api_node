class ErrorHandler extends Error {

    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (error, response) => {

    const { statusCode, message } = error

    response.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    })
}

module.exports = {
    ErrorHandler,
    handleError
}
