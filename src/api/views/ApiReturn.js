'use strict';
class ApiReturn {

    error(message, errors=undefined) {
        return {
            status: 'Error',
            message: message,
            error: errors
        }
    }

    success(message, data=undefined) {
        return {
            status: 'OK',
            message: message,
            data: data
        }
    }

}

module.exports = new ApiReturn();