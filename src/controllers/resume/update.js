const {
    InternalServerError,
    Success,
    Conflict
} = require('../../helpers/ResponseHelper');
const { updateResume } = require('../../objectservices/Resume');
const { mergeMajor } = require('../../objectservices/Major');
const { mergeSchool } = require('../../objectservices/School');

const update = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const updatedResume = await updateResume(resumeId, req.body);
        if (!updatedResume) return Conflict(res);
        if (req.body.isUpdate) {
            let allTextValues = [
                updatedResume.name,
                ...updatedResume.phones,
                ...updatedResume.skills,
                ...updatedResume.majors,
                ...updatedResume.schools,
                ...updatedResume.occupations
            ];
            allTextValues = allTextValues.map(e => e.toLowerCase());
            const labels = updatedResume.toJSON().label;
            const trueLabels = [];
            labels.forEach(label => {
                if (label.text && allTextValues.includes(label.text.toLowerCase()))
                    trueLabels.push(label);
            });
            updatedResume.label = trueLabels;
            updatedResume.save();
        }
        const { majors, schools } = req.body;
        const ms = majors.map(async e => {
            await mergeMajor(e);
        });
        await Promise.all(ms);
        const sc = schools.map(async e => {
            await mergeSchool(e);
        });
        await Promise.all(sc);
        return Success(res, updatedResume.toJSON());
    } catch (err) {
        return InternalServerError(res);
    }
};

module.exports = update;
