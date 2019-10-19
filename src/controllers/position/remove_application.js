const { getPositionById } = require('../../objectservices/Position');
const {
    InternalServerError,
    Success,
    NotFound
} = require('../../helpers/ResponseHelper');
const { SomethingWentWrongMsg } = require('../../Messages');

const remove = async (req, res) => {
    try {
        const position = await getPositionById(req.params.positionId);
        if (!position) return NotFound(res);
        position.resumes.pull(req.params.resumeId);
        position.save();
        return Success(res, position);
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = remove;
