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
        const addedList = [...req.body.resumes];
        if (req.params.resumeId) addedList.push(req.params.resumeId);
        addedList.forEach(e => {
            if (!position.resumes.includes(e))
                position.resumes.push(e);
        });
        position.save();
        return Success(res, position);
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = remove;
