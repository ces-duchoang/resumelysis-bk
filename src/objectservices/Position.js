const Position = require('../models/position');
const { getDocById, removeDocById, updateDoc } = require('./BaseService');
const DEF_PAGE_SIZE = 20;

const paginateQuery = async (query, options) => {
    const { Doc, page = 1, pageSize = DEF_PAGE_SIZE } = options;
    if (!Doc) return { code: 500 };
    const total = await Doc.countDocuments(query).exec();
    if (total === 0) return { pages: 1, page: 1, data: [] };
    const pages = Math.ceil(total / pageSize);
    query.sort('_id');
    query.skip(pageSize * (page - 1)).limit(pageSize);
    query.populate({
        path: 'resumes',
        model: 'Resume'
    });
    const data = await query.exec();
    return { pages, page: parseInt(page), data };
};

const createPosition = data => new Position({ ...data }).save();

const listAllPosition = () => Position.find({ status: 'Processed' });

const listPosition = async (page = 1) => {
    const query = Position.find({});
    return await paginateQuery(query, { Doc: Position, page });
};

const getPositionById = (id, isFull = false) =>
    isFull
        ? Position.findById(id).populate({
              path: 'resumes',
              model: 'Resume'
          })
        : getDocById(Position, id);

const removePositionById = id => removeDocById(Position, id);

const updatePositionById = ({ id, ...updateData }) =>
    updateDoc({ Doc: Position, id, updateData });

const searchPosition = async (title, page = 1) => {
    const query = Position.find({})
        .where('title')
        .in(
            new RegExp(
                title.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&'),
                'i'
            )
        );
    return await paginateQuery(query, { Doc: Position, page });
};

const removeResumeInPosition = async (id, resumeId) =>
    await Position.update(
        { _id: id },
        { $pull: { resumes: resumeId } },
        { new: true }
    ).exec;

const removeResumeFromPosition = resumeId =>
    Position.update(
        { resumes: resumeId },
        { $pull: { resumes: resumeId } },
        { new: true }
    ).exec();

module.exports = {
    createPosition,
    listPosition,
    getPositionById,
    removePositionById,
    updatePositionById,
    searchPosition,
    removeResumeInPosition,
    removeResumeFromPosition,
    listAllPosition
};
