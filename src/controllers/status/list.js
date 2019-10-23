const { listStatus } = require("../../objectservices/Status");
const { InternalServerError } = require("../../helpers/ResponseHelper");

const list = async (req, res) => {
  try {
    const statuses = await listStatus();
    res.json(statuses);
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = list;
