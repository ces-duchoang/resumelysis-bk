const router = require('express').Router();
const { FileWithAuthMw, JsonWithAuthMw } = require('../../middleware/MidWare');

router.get('/:resumeId', JsonWithAuthMw, require('./get'));

router.get('/', JsonWithAuthMw, require('./list'));

router.get('/page/:page', JsonWithAuthMw, require('./list'));

router.get('/search/:query', JsonWithAuthMw, require('./search'));

router.get('/search/:query/page/:page', JsonWithAuthMw, require('./search'));

router.post('/', FileWithAuthMw, require('./create'));

router.put('/:resumeId', JsonWithAuthMw, require('./update'));

router.post('/:resumeId', JsonWithAuthMw, require('./reread'));

router.delete('/:resumeId', JsonWithAuthMw, require('./remove'));

module.exports = router;
