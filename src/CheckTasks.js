'use strict';

var _ = require('lodash');

var ApiAbstract = require('./Abstract');

class CheckTasks extends ApiAbstract {

    constructor (config, client) {
        super();
        this._config = config;

        this._base = this._config.base;

        this._client = client;
    }

    create (data) {

        return new Promise((resolve, reject) => {
            this._client.post(`${this._base}/checkTasks`, data)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

    getLastByCheckId (checkId) {

        return new Promise((resolve, reject) => {
            this._client.get(`${this._base}/checkTasks`, {checkId: checkId, limit: 1})
                .then((body) => {
                    resolve(_.get(body, 'result.0', null));
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

    getLatestByCheckId (checkIds, fields) {

        return new Promise((resolve, reject) => {

            var query = {checkId: checkIds, latest: true};

            query.limit = checkIds.length;

            if (fields) {
                query.fields = fields;
            }

            this._client.get(`${this._base}/CheckTasks`, query)
                .then((body) => {
                    resolve(_.get(body, 'result', []));
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

    getById (id) {

        return new Promise((resolve, reject) => {
            this._client.get(`${this._base}/checkTasks/${id}`)
                .then((body) => {
                    resolve(body.result);
                })
                .catch((error) => {
                    reject(this._processError(error));
                });
        });

    }

}

module.exports = CheckTasks;
