const { listDegree } = require("../../objectservices/Degree");
const { InternalServerError } = require("../../helpers/ResponseHelper");

const list = async (req, res) => {
  try {
    const degreees = await listDegree();
    res.json(degreees);
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = list;
