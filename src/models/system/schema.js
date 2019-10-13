const Schema = require('mongoose').Schema;

const systemSchema = new Schema(
    {
        ieStatus: { type: String, default: 'Done' },
        ieLastTrained: { type: Date, default: Date.now() },
        rankStatus: { type: String, default: 'Done' },
        rankLastTrained: { type: Date, default: Date.now() }
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
    }
);

module.exports = systemSchema;
