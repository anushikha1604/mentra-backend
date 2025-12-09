const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    techStack: [{ type: String }],
    link: { type: String },
}, { _id: false });

const appliedJobSchema = new Schema({
    jobId: { type: String, ref: "Job", required: false },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, default: "applied" },
}, { _id: false });

const studentSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    studentId: { type: String, required: true, unique: true, index: true },
    collegeId: { type: String },
    fullName: { type: String, required: true },
    emailId: { type: String, required: true },
    primaryPhone: { type: String, required: true, length: 10 },
    alternatePhone: { type: String, required: true, length: 10 },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    collegeName: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    DOB: { type: Date, required: true },
    gender: { type: String, required: true },
    password: {
        type: String, required: true, minlength: 6,
        select: false
    },
    skills: [{ type: String, required: true }],
    // projects: [projectSchema],
    resume: {
        url: { type: String },
        filename: { type: String },
    },
    // cgpa: { type: Number, min: 0, max: 10 },
    role: {
        type: String,
        enum: ["student", "institute", "admin"],
        default: "student",
    },
    appliedJobs: { type: [appliedJobSchema], default: ["none"] },
    wishlistCompanies: [{ type: String }],
    isPlaced: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String },
    updatedBy: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Student", studentSchema);
