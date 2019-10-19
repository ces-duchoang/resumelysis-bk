const { removePositionById } = require("../../objectservices/Position");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const remove = async (req, res) => {
  try {
    const { positionId } = getParams(req);
    const positionRemoved = await removePositionById(positionId);
    if (!positionRemoved) return NotFound(res);
    res.json(positionRemoved);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  positionId: req.params.positionId
});

module.exports = remove;
