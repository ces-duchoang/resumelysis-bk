const Status = require("../models/status");
const {
  createDoc,
  listDoc,
  getDocById,
  removeDocById,
  updateDoc
} = require("./BaseService");

const createStatus = data => createDoc(Status, data);

const listStatus = () => listDoc(Status);

const getStatusById = id => getDocById(Status, id);

const removeStatusById = id => removeDocById(Status, id);

const updateStatusById = ({ id, ...updateData }) =>
  updateDoc({ Doc: Status, id, updateData });

module.exports = {
  createStatus,
  listStatus,
  getStatusById,
  removeStatusById,
  updateStatusById
};
