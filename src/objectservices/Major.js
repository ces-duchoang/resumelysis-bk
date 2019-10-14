const Major = require('../models/major');
const {
    createDoc,
    listDoc,
    getDocById,
    removeDocById,
    updateDoc
} = require('./BaseService');

const createMajor = data => createDoc(Major, data);

const listMajor = () => Major.find({}).sort({ name: 1 });

const getMajorById = id => getDocById(Major, id);

const removeMajorById = id => removeDocById(Major, id);

const updateMajorById = ({ id, ...updateData }) =>
    updateDoc({ Doc: Major, id, updateData });

const mergeMajor = async name => {
    const m = await Major.find({ name }).exec();
    if (m.length) return false;
    const mj = await createMajor({ name });
    console.log('object');
    if (mj) return true;
    return false;
};

module.exports = {
    createMajor,
    listMajor,
    getMajorById,
    removeMajorById,
    updateMajorById,
    mergeMajor
};
