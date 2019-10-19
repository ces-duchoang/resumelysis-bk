const router = require('express').Router();
const { JsonWithAuthMw, FileWithAuthMw, JsonMw } = require('../../middleware/MidWare');

router.post('/', JsonWithAuthMw, require('./create'));

router.put('/:positionId', JsonWithAuthMw, require('./update'));

router.get('/', require('./list'));

router.get('/getrate', require('./rate'));

router.get('/page/:page', require('./list'));

router.get('/search/:query', require('./search'));

router.get('/search/:query/page/:page', require('./search'));

router.get('/:positionId', require('./get'));

router.get('/ranking/:positionId', require('./ranking'));

router.get('/:positionId/resumes', require('./get_resumes'));

router.delete('/:positionId', JsonWithAuthMw, require('./remove'));

router.post('/apply/:positionId', [...JsonMw,...FileWithAuthMw], require('./apply'));

router.delete('/:positionId/resumes/:resumeId', [JsonWithAuthMw], require('./remove_application'));

router.post('/:positionId/resumes/:resumeId', [JsonWithAuthMw], require('./add_application'));

router.post('/:positionId/resumes', [JsonWithAuthMw], require('./add_application'));

router.put('/:positionId/ranked', JsonWithAuthMw, require('./update_rank'));

router.get('/:positionId/export/:num', JsonWithAuthMw, require('./export'));


module.exports = router;
