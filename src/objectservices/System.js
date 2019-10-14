const System = require("../models/status");
const {
  createDoc,
  listDoc,
  getDocById,
  removeDocById,
  updateDoc
} = require("./BaseService");

const createSystem = data => createDoc(System, data);

const listSystem = () => listDoc(System);

const getSystemById = id => getDocById(System, id);

const removeSystemById = id => removeDocById(System, id);

const updateSystemById = ({ id, ...updateData }) =>
  updateDoc({ Doc: System, id, updateData });

module.exports = {
  createSystem,
  listSystem,
  getSystemById,
  removeSystemById,
  updateSystemById
};
