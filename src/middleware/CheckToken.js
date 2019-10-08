const jwt = require("jsonwebtoken");
const { SECRET_WORD } = require("../config");
const {
  Unauthorized,
  InternalServerError
} = require("../helpers/ResponseHelper");

const CheckToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) return Unauthorized(res);
    token = token.slice(token.indexOf(" ") + 1, token.length);
    jwt.verify(token, SECRET_WORD, (err, decoded) => {
      if (err) {
        return Unauthorized(res, "Your session invalid");
      } else {
        req.user = decoded;
        req.token = token;
        next();
      }
    });
  } catch (err) {
    return InternalServerError(res);
  }
};

module.exports = CheckToken;
