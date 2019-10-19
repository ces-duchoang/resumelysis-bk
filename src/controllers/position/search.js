const { searchPosition } = require('../../objectservices/Position');
const { InternalServerError } = require('../../helpers/ResponseHelper');

const list = async (req, res) => {
    try {
        const positions = await searchPosition(
            req.params.query,
            req.params.page
        );
        res.json(positions);
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = list;
