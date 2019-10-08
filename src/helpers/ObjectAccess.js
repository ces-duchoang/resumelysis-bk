const has = require("has-value");
const get = require("get-value");
const { isBoolean } = require("lodash");

const isObjectHasValue = (object, keyPath) => has(object, keyPath);

const isAllowProperty = (object, keyPath) =>
  isObjectHasValue(object, keyPath) &&
  isBoolean(get(object, keyPath)) &&
  get(object, keyPath);

module.exports = {
  isObjectHasValue,
  isAllowProperty
};
