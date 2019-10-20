const { searchResume } = require('../../objectservices/Resume');
const { InternalServerError } = require('../../helpers/ResponseHelper');

const list = async (req, res) => {
    try {
        const resumes = await searchResume(req.params.query, req.params.page);
        res.json(resumes);
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = list;
