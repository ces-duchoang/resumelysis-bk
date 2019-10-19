const { getPositionById } = require("../../objectservices/Position");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const get = async (req, res) => {
  try {
    const { positionId } = getParams(req);
    const position = await getPositionById(positionId);
    if (!position) return NotFound(res);
    res.json(position);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  positionId: req.params.positionId
});

module.exports = get;
