const { deleteResume } = require('../../objectservices/Resume');
const { removeResumeFromPosition } = require('../../objectservices/Position');
const {
    InternalServerError,
    NotFound
} = require('../../helpers/ResponseHelper');

const remove = async (req, res) => {
    try {
        const { resumeId } = getParams(req);
        const resumeRemoved = await deleteResume(resumeId);
        if (!resumeRemoved) return NotFound(res);
        await removeResumeFromPosition(resumeId);
        res.json(resumeRemoved);
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    resumeId: req.params.resumeId
});

module.exports = remove;
