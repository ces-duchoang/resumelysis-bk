const { createSchool } = require('../../objectservices/School');
const {
    BadRequest,
    InternalServerError
} = require('../../helpers/ResponseHelper');
const { isNull, isString } = require('lodash');

const create = async (req, res) => {
    try {
        if (!isValidParams(req)) return BadRequest(res);
        const status = await createSchool(getParams(req));
        if (!status) return InternalServerError(res);
        res.json(status);
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    name: req.body.name,
    description: req.body.description || null
});

const isValidParams = req => {
    const { name, description } = getParams(req);
    return isString(name) && (isNull(description) || isString(description));
};

module.exports = create;
