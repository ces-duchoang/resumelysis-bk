const {
    createResume,
    findResumeByMd5
} = require('../../objectservices/Resume');
const { getPositionById } = require('../../objectservices/Position');
const md5File = require('md5-file');
const {
    Conflict,
    InternalServerError,
    Success
} = require('../../helpers/ResponseHelper');
const { SomethingWentWrongMsg } = require('../../Messages');
const APICaller = require('../../helpers/CallAPIHelper');

const apply = async (req, res) => {
    try {
        const position = await getPositionById(req.params.positionId);
        const file = req.file;
        if (!file.path) return Conflict(res, SomethingWentWrongMsg);
        file['md5'] = md5File.sync(file.path);
        const existResume = await findResumeByMd5(file['md5']);
        if (existResume) {
            if(!position.resumes.includes(existResume._id))
                position.resumes.push(existResume._id);
        } else {
            const resumeCreated = await createResume({
                saved_path: file.path,
                md5: file.md5,
                file_name: file.filename,
                note: req.body.note
            });
            if (!resumeCreated) return Conflict(res, SomethingWentWrongMsg);
            APICaller('POST', 'extraction', {
                resumes: [resumeCreated.toJSON()]
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            position.resumes.push(resumeCreated._id);
        }
        position.save();
        return Success(res, { message: 'Submited' });
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = apply;
