const router = require('express').Router();
const { JsonWithAuthMw } = require('../../middleware/MidWare');

router.post('/', JsonWithAuthMw, require('./create'));

router.put('/:degreeId', JsonWithAuthMw, require('./update'));

router.get('/', require('./list'));

router.get('/:degreeId', require('./get'));

router.delete('/:degreeId', JsonWithAuthMw, require('./remove'));

module.exports = router;
