const router = require("express").Router();
const { JsonWithAuthorization, JsonMw } = require("../../middleware/MidWare");

router.post(
  "/",
  JsonMw,
  // JsonWithAuthorization(["system.account.create"]),
  require("./create")
);

module.exports = router;
