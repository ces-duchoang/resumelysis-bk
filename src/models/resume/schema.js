const Schema = require('mongoose').Schema;

const userSchema = new Schema(
    {
        md5: { type: String },
        saved_path: { type: String, required: true },
        file_name: { type: String, required: true },
        name: { type: String },
        email: { type: String, lowercase: true },
        phones: [{ type: String }],
        degrees: [{ type: String }],
        occupations: [{ type: String }],
        skills: [{ type: String }],
        majors: [{ type: String }],
        schools: [{ type: String }],
        candidate_note: { type: String },
        links: [{ type: String }],
        note: { type: String },
        rawText: {type: String},
        label: [{type: Schema.Types.Map}],
        status: { type: String, default: 'Processing' }
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
);

module.exports = userSchema;
