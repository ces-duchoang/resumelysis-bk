const { getPositionById } = require('../../objectservices/Position');
const {
    InternalServerError,
    NotFound,
    Success
} = require('../../helpers/ResponseHelper');

const get = async (req, res) => {
    try {
        const { positionId } = getParams(req);
        const position = await getPositionById(positionId, true);
        if (!position) return NotFound(res);
        Success(
            res,
            position
                .toJSON()
                .resumes.sort((a, b) => a.createdDate < b.createdDate)
        );
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    positionId: req.params.positionId
});

module.exports = get;
