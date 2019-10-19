const {
    updatePositionById,
    getPositionById
} = require('../../objectservices/Position');
const {
    InternalServerError,
    NotFound,
    Success
} = require('../../helpers/ResponseHelper');

const updateRank = async (req, res) => {
    try {
        const params = getParams(req);
        if (params.isModify) {
            const position = await getPositionById(params.id, true);
            if (!position) return NotFound(res);
            const ranked = position.toJSON().ranked;
            ranked.forEach(e => {
                if (params.resume._id.includes(e._id)) {
                    e.selected = !!params.resume.selected;
                } else {
                    if (params.resume._id.length !== 1) {
                        e.selected = !params.resume.selected;
                    }
                }
            });
            position.ranked = ranked;
            await position.save();
            Success(res, position);
        } else {
            const { ranked } = params;
            const positionUpdated = await updatePositionById({
                ...params,
                ranked: ranked.map(e => e)
            });
            if (!positionUpdated) return NotFound(res);
            Success(res, positionUpdated);
        }
    } catch (err) {
        InternalServerError(res);
    }
};

const getParams = req => ({
    id: req.params.positionId,
    ...req.body
});

module.exports = updateRank;
