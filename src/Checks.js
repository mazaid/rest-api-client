'use strict';

var ApiAbstract = require('./Abstract');

class Checks extends ApiAbstract {

    constructor (config, client) {
        super();
        this._config = config;

        this._base = this._config.base;

        this._client = client;
    }

    getById (id, fields, options) {

        return new Promise((resolve, reject) => {
            this._client.get(`${this._base}/checks/byId/${id}`, {fields: fields}, options)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    this._processError(error);
                });
        });

    }

}

module.exports = Checks;
