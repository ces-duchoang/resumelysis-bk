const axios = require('axios');
const { WORKER_URL } = require('../config');
axios.defaults.baseURL = WORKER_URL;

const CallAPIHelper = (method = 'get', url, data, params) => {
    const config = {
        method,
        url,
        data,
        params
    };
    return axios(config);
};

module.exports = CallAPIHelper;
