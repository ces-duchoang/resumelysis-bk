const Schema = require("mongoose").Schema;

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    toJSON: {
      transform: function(doc, ret) {
        delete ret.createdDate;
        delete ret.updatedDate;
      }
    }
  }
);

module.exports = skillSchema;
