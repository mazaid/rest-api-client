'use strict';

var ApiAbstract = require('./Abstract');

class Notifications extends ApiAbstract {

    constructor (config, client) {
        super();
        this._config = config;

        this._base = this._config.base;

        this._client = client;
    }

    send (checkId, message) {

        return new Promise((resolve, reject) => {
            var data = {
                message: message
            };

            this._client.post(`${this._base}/notify/${checkId}`, data)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

}

module.exports = Notifications;
