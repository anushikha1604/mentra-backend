var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema(
  {
    applicationId: { type: Number, unique: true, index: true },
    jobId: { type: Number, required: true, index: true },
    studentId: { type: Number, required: true, index: true },
    employerId: { type: Number },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "offered", "accepted"],
      default: "applied",
    },
    feedback: { type: String },
  },
  { timestamps: true },
);

module.exports = ApplicationSchema;
