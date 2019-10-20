const { listResume } = require('../../objectservices/Resume');
const {
    InternalServerError,
    Success
} = require('../../helpers/ResponseHelper');

const list = async (req, res) => {
    try {
        const resumes = await listResume(req.params.page);
        return Success(res, resumes);
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = list;
