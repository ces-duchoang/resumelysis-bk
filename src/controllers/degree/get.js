const { getDegreeById } = require("../../objectservices/Degree");
const { InternalServerError, NotFound } = require("../../helpers/ResponseHelper");

const get = async (req, res) => {
  try {
    const { degreeId } = getParams(req);
    const degree = await getDegreeById(degreeId);
    if (!degree) return NotFound(res);
    res.json(degree);
  } catch (err) {
    InternalServerError(res);
  }
};

const getParams = req => ({
  degreeId: req.params.degreeId
});

module.exports = get;
