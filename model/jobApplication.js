var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobApplicationSchema = new Schema(
    {
        applicationId: { type: Number, unique: true, index: true },
        jobId: { type: Number, required: true, index: true },
        studentId: { type: Number, required: true, index: true },
        resumeUrl: { type: String },
        coverLetter: { type: String },
        attachments: [{ type: String }],
        status: { type: String, default: 'applied' },
    },
    { timestamps: true },
);

module.exports = JobApplicationSchema;
