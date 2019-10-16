const { createDegree } = require('../../objectservices/Degree');
const {
    BadRequest,
    InternalServerError
} = require('../../helpers/ResponseHelper');
const { isNull, isString } = require('lodash');

const create = async (req, res) => {
    try {
        if (!isValidParams(req)) return BadRequest(res);
        const degree = await createDegree(getParams(req));
        if (!degree) return InternalServerError(res);
        res.json(degree);
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
