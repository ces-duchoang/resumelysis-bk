const CheckToken = require('./CheckToken');
const BodyParser = require('body-parser');
const AccessFilter = require('./AccessFilter');
const multer = require('multer');
const config = require('../config');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, config.UPLOAD_FOLDER);
    },
    filename: function(req, file, cb) {
        if (
            file.originalname.endsWith('.docx') ||
            file.originalname.endsWith('.pdf')
        )
            cb(null, Date.now() + '-' + file.originalname);
        else cb('File not match requirements', null);
    }
});
const upload = multer({ storage: storage });
module.exports = {
    JsonWithAuthMw: [BodyParser.json({ limit: "100mb" }), CheckToken],
    JsonMw: [BodyParser.json({ limit: "100mb" })],
    AuthMw: [CheckToken],
    JsonWithAuthorization: pers => [
        BodyParser.json(),
        CheckToken,
        AccessFilter(pers)
    ],
    UpFileMw: upload.single('file'),
    FileWithAuthMw: [CheckToken, upload.single('file')]
};
