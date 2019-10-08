module.exports = schema => {
  schema.pre("update", function(next) {
    try {
      this._update.updatedDate = Date.now();
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  });
  schema.pre("findByIdAndUpdate", function(next) {
    try {
      this._update.updatedDate = Date.now();
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  });
};
