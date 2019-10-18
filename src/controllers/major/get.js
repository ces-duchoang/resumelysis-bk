const { getMajorById } = require("../../objectservices/Major");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const get = async (req, res) => {
  try {
    const { statusId } = getParams(req);
    const status = await getMajorById(statusId);
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
