const {  } = require("../../objectservices/System");
const { InternalServerError, NotFound, Success } = require("../../helpers/ResponseHelper");

const read = async (req, res) => {
  try {

  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = read;
