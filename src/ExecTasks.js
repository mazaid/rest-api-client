'use strict';


var ApiAbstract = require('./Abstract');

class ExecTasks extends ApiAbstract {

    constructor (config, client) {
        super();
        this._config = config;

        this._base = this._config.base;

        this._client = client;
    }

    create (data) {

        return new Promise((resolve, reject) => {
            this._client.post(`${this._base}/execTasks`, data)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

    getById (id) {

        return new Promise((resolve, reject) => {
            this._client.get(`${this._base}/execTasks/${id}`)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

}

module.exports = ExecTasks;
