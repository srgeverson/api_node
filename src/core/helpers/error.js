class ErrorHandler extends Error {

    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (error, response) => {

    const { statusCode, message } = error;

    let tryMessage = 'undefined';

    switch (statusCode) {
        case '400':
            tryMessage = 'Atênção';
            break;
        case '401':
            tryMessage = 'Atênção';
            break;
        case '403':
            tryMessage = 'Atênção';
            break;
        case '404':
            tryMessage = 'Atênção';
            break;
        case '409':
            tryMessage = 'Erro';
            break;
        default:
            tryMessage = 'Erro';
            break;
    }

    response.status(statusCode).json({
        status: tryMessage,
        statusCode,
        message
    });
}

module.exports = {
    ErrorHandler,
    handleError
}
