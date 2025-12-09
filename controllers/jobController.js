const Job = require("../model/job");
const Application = require("../model/application");

exports.postJob = async (req, res) => {
    try {
        const payload = req.body;
        payload.postedBy = req.user && req.user._id ? req.user._id : payload.postedBy; // support auth or payload
        const job = await Job.create(payload);
        return res.status(201).json({ data: job });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.listJobs = async (req, res) => {
    try {
        const query = { isActive: true };
        if (req.query.q) {
            const q = req.query.q;
            query.$or = [{ title: { $regex: q, $options: "i" } }, { companyName: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];
        }
        const jobs = await Job.find(query).sort({ createdAt: -1 });
        return res.status(200).json({ data: jobs });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        return res.status(200).json({ data: job });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Job not found" });
        return res.status(200).json({ data: updated });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!job) return res.status(404).json({ error: "Job not found" });
        return res.status(200).json({ data: job });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// optional endpoint: get applicants for a job
exports.getApplicants = async (req, res) => {
    try {
        const apps = await Application.find({ job: req.params.id }).populate("student", "studentId collegeName fullName");
        return res.status(200).json({ data: apps });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
