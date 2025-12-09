const application = require("../doa/applications");
const jobDAO = require("../doa/jobs");
var log = require("../logger");

function getNextSequence() {
  return new Promise((resolve) => {
    return application
      .findOne()
      .sort([["applicationId", "descending"]])
      .limit(1)
      .exec((err, data) => {
        if (data != null) {
          if (data.applicationId != undefined) {
            return resolve(data.applicationId);
          } else {
            return resolve(0);
          }
        } else return resolve(0);
      });
  });
}

// Get all applications (admin/employer see their jobs' applications; student sees own)
exports.getApplications = async function (req, res, next) {
  try {
    let query = {};
    if (req.user) {
      if (req.user.role === "student") {
        // Student sees only their own applications
        query.studentId = req.user.userId;
      } else if (req.user.role === "employer") {
        // Employer sees applications for their posted jobs
        query.employerId = req.user.userId;
      }
      // admin sees all (empty query)
    }
    let result = await application.get(query);
    res.status(200).json({ items: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};

// Get application by ID (authorized users only)
exports.getApplicationById = async function (req, res, next) {
  try {
    if (!req.params.applicationId)
      return res.status(400).json({ error: "request parameters required" });
    const applicationId = parseInt(req.params.applicationId);
    let result = await application.getById({ applicationId: applicationId });
    if (!result)
      return res.status(404).json({ error: "Application not found" });

    // Check access: student (owner), employer (job owner), or admin
    if (
      req.user &&
      req.user.role !== "admin" &&
      req.user.userId !== result.studentId &&
      req.user.userId !== result.employerId
    ) {
      return res.status(403).json({ error: "forbidden" });
    }

    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};

// Create application (typically via /jobs/:jobId/apply, but can also be direct)
exports.createApplication = async function (req, res, next) {
  try {
    if (!req.body)
      return res.status(400).json({ error: "request body required" });
    const { jobId, studentId, resumeUrl, coverLetter, attachments } = req.body;

    if (!jobId || !studentId || !resumeUrl) {
      return res.status(400).json({
        error: "jobId, studentId, and resumeUrl are required",
      });
    }

    // Verify job exists
    let jobData = await jobDAO.getOne({ jobId: jobId });
    if (!jobData) return res.status(404).json({ error: "Job not found" });

    var appObj = {
      jobId: jobId,
      studentId: studentId,
      employerId: jobData.postedBy,
      resumeUrl: resumeUrl,
      coverLetter: coverLetter || "",
      attachments: attachments || [],
      status: "applied",
    };

    let Id = await getNextSequence();
    appObj.applicationId = parseInt(Id) + 1;

    let result = await application.create(appObj);
    if (result) {
      res
        .status(200)
        .json({ message: "application created successfully", application: result });
    } else {
      res.status(500).json({ error: "can't create application" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};

// Update application status (employer/admin only)
exports.updateApplicationStatus = async function (req, res, next) {
  try {
    if (!req.params.applicationId)
      return res.status(400).json({ error: "request parameters required" });
    if (!req.body.status)
      return res.status(400).json({ error: "status is required" });

    const applicationId = parseInt(req.params.applicationId);
    let appData = await application.getOne({ applicationId: applicationId });
    if (!appData)
      return res.status(404).json({ error: "Application not found" });

    // Only employer (job owner) or admin can update status
    if (
      req.user &&
      req.user.role !== "admin" &&
      req.user.userId !== appData.employerId
    ) {
      return res.status(403).json({
        error: "only employer or admin can update application status",
      });
    }

    let updateObj = {
      status: req.body.status,
      feedback: req.body.feedback || appData.feedback,
    };

    let result = await application.update({ applicationId: applicationId }, updateObj);
    if (result) {
      res
        .status(200)
        .json({
          message: "application status updated successfully",
          application: result,
        });
    } else {
      res.status(500).json({ error: "can't update application" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};

// Withdraw application (student owner only)
exports.withdrawApplication = async function (req, res, next) {
  try {
    if (!req.params.applicationId)
      return res.status(400).json({ error: "request parameters required" });
    const applicationId = parseInt(req.params.applicationId);
    let appData = await application.getOne({ applicationId: applicationId });
    if (!appData)
      return res.status(404).json({ error: "Application not found" });

    // Only the student owner can withdraw
    if (req.user && req.user.userId !== appData.studentId) {
      return res
        .status(403)
        .json({ error: "only application owner can withdraw" });
    }

    let result = await application.delete({ applicationId: applicationId });
    if (result) {
      res.status(200).json({ message: "application withdrawn successfully" });
    } else {
      res.status(500).json({ error: "can't withdraw application" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};

// Delete application (admin only)
exports.deleteApplication = async function (req, res, next) {
  try {
    if (!req.params.applicationId)
      return res.status(400).json({ error: "request parameters required" });
    const applicationId = parseInt(req.params.applicationId);
    let appData = await application.getOne({ applicationId: applicationId });
    if (!appData)
      return res.status(404).json({ error: "Application not found" });

    // Only admin can forcefully delete
    if (req.user && req.user.role !== "admin") {
      return res.status(403).json({
        error: "only admin can delete applications",
      });
    }

    let result = await application.delete({ applicationId: applicationId });
    if (result) {
      res.status(200).json({ message: "application deleted successfully" });
    } else {
      res.status(500).json({ error: "can't delete application" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "internal error" });
  }
};
