const jwt = require("jsonwebtoken");
const { SECRET_WORD, SESSION_EXPIRE_TIME } = require("../../config");
const { isMatchBcryptHash } = require("../../helpers/HashHelper");
const { getUserByEmail } = require("../../objectservices/User");
const {
  BadRequest,
  InternalServerError
} = require("../../helpers/ResponseHelper");
const { isValidAccountObject } = require("../../validator/User");
const { WrongEmailPasswordMsg } = require("../../Messages");

const auth = async (req, res) => {
  try {
    if (!isValidAccountObject(req.body)) return BadRequest(res);
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return BadRequest(res, WrongEmailPasswordMsg);
    if (isMatchBcryptHash(password, user.hashPassword)) {
      return responseSession(res, user.toJSON());
    }
    return BadRequest(res, WrongEmailPasswordMsg);
  } catch (err) {
    InternalServerError(res);
  }
};

const responseSession = (res, user) => {
  const session = createToken(user);
  return res.json({ session, user });
};

const createToken = (user, expireTime = SESSION_EXPIRE_TIME) =>
  jwt.sign({ ...user }, SECRET_WORD, {
    expiresIn: expireTime
  });

module.exports = auth;
