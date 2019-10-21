const { listSchool } = require("../../objectservices/School");
const { InternalServerError } = require("../../helpers/ResponseHelper");

const list = async (req, res) => {
  try {
    const schools = await listSchool();
    res.json(schools);
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = list;
