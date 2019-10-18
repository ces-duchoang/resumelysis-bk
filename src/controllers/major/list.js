const { listMajor } = require("../../objectservices/Major");
const { InternalServerError } = require("../../helpers/ResponseHelper");

const list = async (req, res) => {
  try {
    const majors = await listMajor();
    res.json(majors);
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = list;
