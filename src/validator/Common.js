const getError = ({error, field='abc'}) => {
  if (!error) return;
  return `${field}${error.details[0].message.slice(
    error.details[0].message.lastIndexOf('"') + 1
  )}`;
};

module.exports = { getError };
