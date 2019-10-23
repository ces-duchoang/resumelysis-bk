const { removeStatusById } = require("../../objectservices/Status");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const remove = async (req, res) => {
  try {
    const { statusId } = getParams(req);
    const statusRemoved = await removeStatusById(statusId);
    if (!statusRemoved) return NotFound(res);
    res.json(statusRemoved);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  statusId: req.params.statusId
});

module.exports = remove;
