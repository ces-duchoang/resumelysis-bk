const { createPosition } = require('../../objectservices/Position');
const {
    BadRequest,
    InternalServerError
} = require('../../helpers/ResponseHelper');
const { isNull, isString } = require('lodash');

const create = async (req, res) => {
    try {
        if (!isValidParams(req)) return BadRequest(res);
        const position = await createPosition({
            ...req.body,
            ...getParams(req)
        });
        if (!position) return InternalServerError(res);
        res.json(position);
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    title: req.body.title,
    description: req.body.description || null
});

const isValidParams = req => {
    const { title, description } = getParams(req);
    return isString(title) && (isNull(description) || isString(description));
};

module.exports = create;
