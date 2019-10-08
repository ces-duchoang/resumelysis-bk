const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { SALT_LENGTH = 30, SALT_ROUNDS = 10 } = {}; // require("../config");

const getHashString = (sourceString, saltString) => {
  return crypto
    .createHash("sha256")
    .update(sourceString + saltString)
    .digest("hex")
    .toString();
};

const getRandomString = (length = SALT_LENGTH) => {
  return crypto.randomBytes(length).toString("hex");
};

const genBcryptSalt = () => bcrypt.genSaltSync(SALT_ROUNDS);

const getBcryptHash = plainPassword =>
  bcrypt.hashSync(plainPassword, genBcryptSalt());

const isMatchBcryptHash = (plainPassword, hash) =>
  bcrypt.compareSync(plainPassword, hash);

module.exports = {
  getHashString,
  getRandomString,
  getBcryptHash,
  isMatchBcryptHash
};
