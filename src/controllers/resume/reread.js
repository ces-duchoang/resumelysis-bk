const { getResumeById } = require('../../objectservices/Resume');
const {
    Conflict,
    InternalServerError,
    Success
} = require('../../helpers/ResponseHelper');
const { SomethingWentWrongMsg } = require('../../Messages');
const APICaller = require('../../helpers/CallAPIHelper');

const reread = async (req, res) => {
    try {
        const resume = await getResumeById(req.params.resumeId);
        resume.status = 'Processing';
        await resume.save();
        if (!resume) return Conflict(res, SomethingWentWrongMsg);
        APICaller('POST', 'extraction', { resumes: [resume.toJSON()] })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        return Success(res, resume.toJSON());
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = reread;
