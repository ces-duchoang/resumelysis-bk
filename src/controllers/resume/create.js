const {
    createResume,
    findResumeByMd5
} = require('../../objectservices/Resume');
const md5File = require('md5-file');
const {
    Conflict,
    InternalServerError,
    Success
} = require('../../helpers/ResponseHelper');
const { SomethingWentWrongMsg, ExistResumeMsg } = require('../../Messages');
const APICaller = require('../../helpers/CallAPIHelper');

const create = async (req, res) => {
    try {
        const file = req.file;
        if (!file.path) return Conflict(res, SomethingWentWrongMsg);
        file['md5'] = md5File.sync(file.path);
        const existResume = await findResumeByMd5(file['md5']);
        if (existResume) return Conflict(res, ExistResumeMsg);
        const resumeCreated = await createResume({
            saved_path: file.path,
            md5: file.md5,
            file_name: file.filename
        });
        if (!resumeCreated) return Conflict(res, SomethingWentWrongMsg);
        APICaller('POST', 'extraction', { resumes: [resumeCreated.toJSON()] })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        return Success(res, resumeCreated.toJSON());
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = create;
