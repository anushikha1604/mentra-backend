const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["applied", "shortlisted", "rejected", "accepted"], default: "applied" },
    resumeSnapshot: { url: String, filename: String },
    coverLetter: { type: String },
    notes: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
}, { timestamps: true });

applicationSchema.index({ job: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
