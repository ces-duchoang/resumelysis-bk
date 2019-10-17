const router = require("express").Router();
const { FileWithAuthMw } = require("../../middleware/MidWare");

router.post("/", FileWithAuthMw, require("./upload"));

module.exports = router;
