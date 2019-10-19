const { updatePositionById } = require('../../objectservices/Position');
const {
    BadRequest,
    InternalServerError,
    NotFound
} = require('../../helpers/ResponseHelper');
const { isString, isUndefined } = require('lodash');

const update = async (req, res) => {
    try {
        if (!isValidParams(req)) return BadRequest(res);
        const positionUpdated = await updatePositionById(getParams(req));
        if (!positionUpdated) return NotFound(res);
        res.json(positionUpdated);
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    id: req.params.positionId,
    ...req.body
});

const isValidParams = req => {
    const { title, description } = getParams(req);
    return (
        isString(title) && (isUndefined(description) || isString(description))
    );
};

module.exports = update;
