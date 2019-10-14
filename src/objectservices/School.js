const School = require('../models/school');
const {
    createDoc,
    listDoc,
    getDocById,
    removeDocById,
    updateDoc
} = require('./BaseService');

const createSchool = data => createDoc(School, data);

const listSchool = () => School.find({}).sort({ name: 1 });

const getSchoolById = id => getDocById(School, id);

const removeSchoolById = id => removeDocById(School, id);

const updateSchoolById = ({ id, ...updateData }) =>
    updateDoc({ Doc: School, id, updateData });

const mergeSchool = async name => {
    const m = await School.find({ name }).exec();
    if (m.length) return false;
    const mj = await createSchool({ name });
    if (mj) return true;
    return false;
};

module.exports = {
    createSchool,
    listSchool,
    getSchoolById,
    removeSchoolById,
    updateSchoolById,
    mergeSchool
};
