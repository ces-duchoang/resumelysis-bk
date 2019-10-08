const router = require("express").Router();
const { AuthMw, JsonMw } = require("../../middleware/MidWare");

router.post("/", JsonMw, require("./auth"));
router.get("/", AuthMw, require("./get"));

module.exports = router;
