const router = require("express").Router();
const { JsonWithAuthorization, JsonMw } = require("../../middleware/MidWare");

router.post("/", JsonMw, require("./create"));

module.exports = router;
