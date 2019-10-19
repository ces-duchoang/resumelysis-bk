const { listAllPosition } = require('../../objectservices/Position');
const {
    InternalServerError,
    Success
} = require('../../helpers/ResponseHelper');

const rate = async (req, res) => {
    try {
        const positions = await listAllPosition();
        const result = positions.map(e =>
            e.ranked.map(r => ({
                criterions: r.criterions,
                point: r.point
            }))
        );
        return Success(res, [].concat.apply([], result));
    } catch (err) {
        InternalServerError(res);
    }
};

module.exports = rate;
