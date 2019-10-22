const { listSkill } = require('../../objectservices/Skill');
const { InternalServerError, Success } = require('../../helpers/ResponseHelper');

const list = async (req, res) => {
    try {
        const skills = await listSkill();
        Success(res, skills.map(e => e.toJSON()));
    } catch (err) {
        console.log(err);
        InternalServerError(res);
    }
};

module.exports = list;
