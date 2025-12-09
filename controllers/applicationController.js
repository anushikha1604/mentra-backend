const Application = require("../model/application");
const Job = require("../model/job");

exports.apply = async (req, res) => {
    try {
        const { jobId, studentId, resumeSnapshot, coverLetter } = req.body;
        if (!jobId || !studentId) return res.status(400).json({ error: "jobId and studentId required" });

        const job = await Job.findById(jobId);
        if (!job || !job.isActive) return res.status(404).json({ error: "Job not available" });

        const payload = { job: jobId, student: studentId, resumeSnapshot, coverLetter };
        // unique index on (job, student) will prevent duplicates
        const application = await Application.create(payload);
        return res.status(201).json({ data: application });
    } catch (err) {
        // handle duplicate error nicely
        if (err.code === 11000) return res.status(409).json({ error: "Already applied" });
        return res.status(500).json({ error: err.message });
    }
};

exports.getApplicationsByStudent = async (req, res) => {
    try {
        const apps = await Application.find({ student: req.params.studentId }).populate("job");
        return res.status(200).json({ data: apps });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!app) return res.status(404).json({ error: "Application not found" });
        return res.status(200).json({ data: app });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
