const { updateSchoolById } = require("../../objectservices/School");
const {
  BadRequest,
  InternalServerError,
  NotFound
} = require("../../helpers/ResponseHelper");
const { isString, isUndefined } = require("lodash");

const update = async (req, res) => {
  try {
    if (!isValidParams(req)) return BadRequest(res);
    const statusUpdated = await updateSchoolById(getParams(req));
    if (!statusUpdated) return NotFound(res);
    res.json(statusUpdated);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  id: req.params.statusId,
  ...req.body
});

const isValidParams = req => {
  const { name, description } = getParams(req);
  return isString(name) && (isUndefined(description) || isString(description));
};

module.exports = update;
