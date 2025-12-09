const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobId: { type: Number, unique: true, index: true },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // company user
    location: { type: String },
    description: { type: String },
    requirements: [{ type: String }],
    salaryRange: { from: Number, to: Number },
    jobType: { type: String, enum: ["full-time", "part-time", "internship", "contract"], default: "full-time" },
    experienceLevel: { type: String }, // e.g. "0-1", "1-3", etc.
    isActive: { type: Boolean, default: true },
    skills: [{ type: String }],
    applicationLastDate: { type: Date },
    createdBy: { type: String },
    updatedBy: { type: String },
    attachments: [{ type: String }],
}, { timestamps: true });

module.exports = jobSchema;
