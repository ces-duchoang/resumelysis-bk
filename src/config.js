require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    MODE: process.env.NODE_ENV,
    SECRET_WORD: process.env.SECRET_WORD,
    DEF_PAGE_SIZE: 20,
    ENABLE_URL: process.env.ENABLE_URL,
    SALT_LENGTH: 32,
    SALT_ROUNDS: 10,
    SESSION_EXPIRE_TIME: '60d',
    UPLOAD_FOLDER: process.env.UPLOAD_FOLDER,
    WORKER_URL: process.env.WORKER_URL
};
