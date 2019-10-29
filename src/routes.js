const router = require('express')();

router.use('/auth', require('./controllers/auth'));
router.use('/users', require('./controllers/user'));
router.use('/files', require('./controllers/file'));
router.use('/status', require('./controllers/status'));
router.use('/majors', require('./controllers/major'));
router.use('/schools', require('./controllers/school'));
router.use('/skills', require('./controllers/skill'));
router.use('/positions', require('./controllers/position'));
router.use('/degrees', require('./controllers/degree'));
router.use('/resumes', require('./controllers/resume'));
router.use('/system', require('./controllers/system'));

module.exports = router;
