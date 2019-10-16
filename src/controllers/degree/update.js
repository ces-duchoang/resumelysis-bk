const { updateDegreeById } = require("../../objectservices/Degree");
const {
  BadRequest,
  InternalServerError,
  NotFound
} = require("../../helpers/ResponseHelper");
const { isString, isUndefined } = require("lodash");

const update = async (req, res) => {
  try {
    if (!isValidParams(req)) return BadRequest(res);
    const degreeUpdated = await updateDegreeById(getParams(req));
    if (!degreeUpdated) return NotFound(res);
    res.json(degreeUpdated);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  id: req.params.degreeId,
  ...req.body
});

const isValidParams = req => {
  const { name, description } = getParams(req);
  return isString(name) && (isUndefined(description) || isString(description));
};

module.exports = update;
