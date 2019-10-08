const Logger = (req, res, next) => {
    console.log(req.method, new Date(), req.path);
    next();
}

module.exports = Logger;