const router = require('express').Router();
const { JsonWithAuthMw } = require('../../middleware/MidWare');

router.post('/', JsonWithAuthMw, require('./create'));

router.put('/:statusId', JsonWithAuthMw, require('./update'));

router.get('/', require('./list'));

router.get('/:statusId', require('./get'));

router.delete('/:statusId', JsonWithAuthMw, require('./remove'));

module.exports = router;
