const Schema = require("mongoose").Schema;

const degreeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
  }
);

module.exports = degreeSchema;
