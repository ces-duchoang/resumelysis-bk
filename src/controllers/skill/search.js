const { searchSkill } = require('../../objectservices/Skill');
const { InternalServerError, Success } = require('../../helpers/ResponseHelper');

const list = async (req, res) => {
    try {
        const skills = await searchSkill(req.query.query);
        Success(res, skills.map(e => e.toJSON()));
    } catch (err) {
        console.log(err);
        InternalServerError(res);
    }
};

module.exports = list;
