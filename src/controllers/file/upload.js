const upload = (req, res) => {
    return res.json({...req.file, ...req.body});
};

module.exports = upload;
