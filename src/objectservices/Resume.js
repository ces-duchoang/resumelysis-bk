const ResumeModel = require('../models/resume');
const DEF_PAGE_SIZE = 20;

const paginateQuery = async (query, options) => {
    const { Doc, page = 1, pageSize = DEF_PAGE_SIZE } = options;
    if (!Doc) return { code: 500 };
    const total = await Doc.countDocuments(query).exec();
    const pages = Math.ceil(total / pageSize);
    query.sort('-createdDate');
    query.skip(pageSize * (page - 1)).limit(pageSize);
    const data = await query.exec();
    return { pages, page: parseInt(page), data };
};

const createResume = resume => new ResumeModel(resume).save();

const getResumeById = (id, selected = '') =>
    ResumeModel.findById(id)
        .select(selected)
        .exec();

const listAllResume = async () => ResumeModel.find({})

const listResume = async (page = 1) => {
    const query = ResumeModel.find({});
    return await paginateQuery(query, { Doc: ResumeModel, page });
};

const updateResume = (id, data) =>
    ResumeModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec();

const deleteResume = id => ResumeModel.findByIdAndRemove(id).exec();

const getResumeCollection = ids =>
    ResumeModel.find({ _id: { $in: ids } }).exec();

const searchResume = async (name, page = 1) => {
    const query = ResumeModel.find({ name: { $exists: true, $ne: null } })
        .where('name')
        .in(
            new RegExp(
                name.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&'),
                'i'
            )
        );
    return await paginateQuery(query, { Doc: ResumeModel, page });
};

const findResumeByMd5 = md5 => ResumeModel.findOne({ md5 });

module.exports = {
    createResume,
    getResumeById,
    updateResume,
    deleteResume,
    getResumeCollection,
    listResume,
    searchResume,
    findResumeByMd5,
    listAllResume
};
