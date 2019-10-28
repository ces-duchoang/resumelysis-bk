const router = require('express').Router();
const { JsonWithAuthMw } = require('../../middleware/MidWare');

router.get('/', JsonWithAuthMw, require('./read'));

module.exports = router;
