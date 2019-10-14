const Skill = require('../models/skill');
const {
    createDoc,
    listDoc,
    getDocById,
    removeDocById,
    updateDoc
} = require('./BaseService');

const createSkill = data => createDoc(Skill, data);

const listSkill = () => listDoc(Skill);

const getSkillById = id => getDocById(Skill, id);

const removeSkillById = id => removeDocById(Skill, id);

const updateSkillById = ({ id, ...updateData }) =>
    updateDoc({ Doc: Skill, id, updateData });

const searchSkill = name =>
    Skill.find({})
        .where('name')
        .in(
            new RegExp(
                name.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&'),
                'i'
            )
        )
        .limit(20)
        .exec();

module.exports = {
    createSkill,
    listSkill,
    getSkillById,
    removeSkillById,
    updateSkillById,
    searchSkill
};
