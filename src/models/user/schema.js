const Schema = require("mongoose").Schema;

const userSchema = new Schema(
  {
    name: { type: String, default: "User" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    hashPassword: {
      type: String,
      required: true
    },
    // salt_password: {
    //   type: String,
    //   required: true
    // },
    join_date: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret.hashPassword;
        delete ret._id;
      }
    }
  }
);

module.exports = userSchema;
