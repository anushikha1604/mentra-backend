const Enquiry = require("../model/enquiry");

exports.createEnquiry = async (req, res) => {
    try {
        const payload = req.body; // expects student, subject, message
        const enq = await Enquiry.create(payload);
        return res.status(201).json({ data: enq });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.listByStudent = async (req, res) => {
    try {
        const enqs = await Enquiry.find({ student: req.params.studentId }).sort({ createdAt: -1 });
        return res.status(200).json({ data: enqs });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.respond = async (req, res) => {
    try {
        const { message, responder } = req.body;
        const updated = await Enquiry.findByIdAndUpdate(req.params.id, { status: "in-progress", response: { responder, message, respondedAt: new Date() } }, { new: true });
        if (!updated) return res.status(404).json({ error: "Enquiry not found" });
        return res.status(200).json({ data: updated });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.close = async (req, res) => {
    try {
        const updated = await Enquiry.findByIdAndUpdate(req.params.id, { status: "closed" }, { new: true });
        if (!updated) return res.status(404).json({ error: "Enquiry not found" });
        return res.status(200).json({ data: updated });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
