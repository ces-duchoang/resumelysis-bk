const { getPositionById } = require('../../objectservices/Position');
const {
    InternalServerError,
    NotFound,
    Success
} = require('../../helpers/ResponseHelper');
const APICaller = require('../../helpers/CallAPIHelper');

const ranking = async (req, res) => {
    try {
        const { positionId } = getParams(req);
        const position = await getPositionById(positionId, true);
        if (!position) return NotFound(res);
        position['status'] = 'In processing';
        position.save();
        APICaller('POST', 'ranking', {
            _id: position._id,
            resumes: position.resumes,
            criterions: {
                skills: position.skills,
                degrees: position.degrees,
                schools: position.schools,
                majors: position.majors
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        Success(res, {
            _id: position._id,
            resumes: position.resumes,
            criterions: {
                skills: position.skills,
                degrees: position.degrees,
                schools: position.schools,
                majors: position.majors
            }
        });
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    positionId: req.params.positionId
});

module.exports = ranking;
