'use strict';

var createError =  require('mazaid-error');
var parseError = require('mazaid-error/parse');

class Abstract {

    _processError(error) {
        if (error.checkable) {
            return createError(error.message, error.code).setEntity(error.entity).setList(error.list);
        }

        if (!error.response || !error.response.body || !error.response.body.error) {
            return error;
        }

        const checkableError = parseError(error, 'response.body.error');

        return (checkableError) ? checkableError : error;
    }

}

module.exports = Abstract;
