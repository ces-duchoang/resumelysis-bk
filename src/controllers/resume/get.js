const { getResumeById } = require('../../objectservices/Resume');
const {
    InternalServerError,
    NotFound,
    Success
} = require('../../helpers/ResponseHelper');

const get = async (req, res) => {
    try {
        const { resumeId } = getParams(req);
        const resume = await getResumeById(resumeId);
        if (!resume) return NotFound(res);
        return Success(res, resume);
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    resumeId: req.params.resumeId
});

module.exports = get;
