const UserModel = require("../models/user");

const createUser = user => new UserModel(user).save();

const getUserById = (id, selected = "") =>
  UserModel.findById(id)
    .select(selected)
    .exec();

const getUserByEmail = (email, selected = "") =>
  UserModel.findOne({ email })
    .select(selected)
    .exec();

module.exports = {
  createUser,
  getUserById,
  getUserByEmail
};
