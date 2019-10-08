const { getUserByEmail } = require("../../objectservices/User");
const {
  InternalServerError,
  NotFound,
  Success
} = require("../../helpers/ResponseHelper");

const get = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await getUserByEmail(email);
    if (!user) return NotFound(res);
    return Success(res, {session: req.token, user: user.toJSON()})
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = get;
