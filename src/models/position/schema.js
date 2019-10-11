const Schema = require('mongoose').Schema;

const positionSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        resumes: [{ type: Schema.Types.ObjectId }],
        ranked: [{ type: Schema.Types.Mixed }],
        skills: [{ type: String }],
        degrees: [{ type: String }],
        majors: [{ type: String }],
        schools: [{ type: String }],
        status: { type: String, default: 'Not ranked' },
        expireAt: { type: Date },
        createBy: { type: String }
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
);

module.exports = positionSchema;
