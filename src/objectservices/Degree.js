const Degree = require("../models/degree");
const {
  createDoc,
  listDoc,
  getDocById,
  removeDocById,
  updateDoc
} = require("./BaseService");

const createDegree = data => createDoc(Degree, data);

const listDegree = () => listDoc(Degree);

const getDegreeById = id => getDocById(Degree, id);

const removeDegreeById = id => removeDocById(Degree, id);

const updateDegreeById = ({ id, ...updateData }) =>
  updateDoc({ Doc: Degree, id, updateData });

module.exports = {
  createDegree,
  listDegree,
  getDegreeById,
  removeDegreeById,
  updateDegreeById
};
