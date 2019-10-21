const { getSchoolById } = require("../../objectservices/School");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const get = async (req, res) => {
  try {
    const { statusId } = getParams(req);
    const status = await getSchoolById(statusId);
    if (!status) return NotFound(res);
    res.json(status);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  statusId: req.params.statusId
});

module.exports = get;
