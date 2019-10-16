const { removeDegreeById } = require("../../objectservices/Degree");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const remove = async (req, res) => {
  try {
    const { degreeId } = getParams(req);
    const degreeRemoved = await removeDegreeById(degreeId);
    if (!degreeRemoved) return NotFound(res);
    res.json(degreeRemoved);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  degreeId: req.params.degreeId
});

module.exports = remove;
