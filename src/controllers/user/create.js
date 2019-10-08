const { getUserByEmail, createUser } = require("../../objectservices/User");
const {
  BadRequest,
  Conflict,
  InternalServerError,
  Created
} = require("../../helpers/ResponseHelper");
const { getBcryptHash } = require("../../helpers/HashHelper");
const { isValidUserObject } = require("../../validator/User");
const { EmailExistedMsg, SomethingWentWrongMsg } = require("../../Messages");

const create = async (req, res) => {
  try {
    if (!isValidUserObject(req.body)) return BadRequest(res);
    const { name, email, password } = req.body;
    const userInDb = await getUserByEmail(email);
    if (userInDb) return Conflict(res, EmailExistedMsg);
    const hashPassword = getBcryptHash(password);
    const newUser = {
      name,
      email,
      hashPassword
    };
    if (await createUser(newUser)) return Created(res, { name, email });
    else return Conflict(res, SomethingWentWrongMsg);
  } catch (err) {
    InternalServerError(res);
  }
};

module.exports = create;
