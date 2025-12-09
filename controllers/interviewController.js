const Interview = require("../model/interview");
const Application = require("../model/application");

exports.schedule = async (req, res) => {
    try {
        const payload = req.body; // expects job, student, company, scheduleAt, mode, location
        const interview = await Interview.create(payload);
        // optionally update application status to 'shortlisted'
        if (payload.job && payload.student) {
            await Application.findOneAndUpdate({ job: payload.job, student: payload.student }, { status: "shortlisted" });
        }
        return res.status(201).json({ data: interview });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.listByStudent = async (req, res) => {
    try {
        const interviews = await Interview.find({ student: req.params.studentId }).populate("job company", "title companyName fullName");
        return res.status(200).json({ data: interviews });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!interview) return res.status(404).json({ error: "Interview not found" });
        return res.status(200).json({ data: interview });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
