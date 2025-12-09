const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    company: { type: Schema.Types.ObjectId, ref: "User", required: true },
    scheduleAt: { type: Date, required: true },
    mode: { type: String, enum: ["online", "offline"], default: "online" },
    location: { type: String }, // physical location or meeting link
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
    feedback: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
