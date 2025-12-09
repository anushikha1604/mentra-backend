const jobDAO = require("../doa/jobs");
const applicationDAO = require("../doa/applications");
var log = require("../logger");

function getNextSequence() {
  return new Promise((resolve) => {
    return jobDAO
      .findOne()
      .sort([["jobId", "descending"]])
      .limit(1)
      .exec((err, data) => {
        if (data != null) {
          if (data.jobId != undefined) {
            return resolve(data.jobId);
          } else {
            return resolve(0);
          }
        } else return resolve(0);
      });
  });
}

exports.createJob = async function (req, res, next) {
  try {
    if (!req.body) return res.status(400).json({ error: "request body required" });
    // generate jobId
    var Id = await getNextSequence();
    var jobObject = Object.assign({}, req.body);
    jobObject.jobId = parseInt(Id) + 1;
    jobObject.postedBy = req.user ? req.user.userId : undefined;
    let result = await jobDAO.create(jobObject);
    if (result) {
      res.status(200).json({ message: "job created successfully", job: result });
    } else {
      res.status(500).json({ error: "can't create job" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};

// get all jobs (with simple filters via query)
exports.getJobs = async function (req, res, next) {
  try {
    const q = {};
    if (req.query.title) q.title = { $regex: req.query.title, $options: "i" };
    if (req.query.location) q.location = req.query.location;
    if (req.query.employmentType) q.employmentType = req.query.employmentType;
    if (req.query.publish) q.publish = req.query.publish === "true";
    if (req.query.skill) q.skills = { $in: [req.query.skill] };
    let result = await jobDAO.get(q);
    res.status(200).json({ items: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.getJobById = async function (req, res, next) {
  try {
    if (!req.params.jobId) return res.status(400).json({ error: "request parameters required" });
    const jobId = parseInt(req.params.jobId);
    let result = await jobDAO.getById({ jobId: jobId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.updateJob = async function (req, res, next) {
  try {
    if (!req.params.jobId) return res.status(400).json({ error: "request parameters required" });
    const jobId = parseInt(req.params.jobId);
    let jobData = await jobDAO.getOne({ jobId: jobId });
    if (!jobData) return res.status(404).json({ error: "Job not found" });
    // simple ownership/admin check: allow if postedBy matches or user is admin
    if (req.user && req.user.role !== 'admin' && req.user.userId !== jobData.postedBy) {
      return res.status(403).json({ error: 'forbidden' });
    }
    let result = await jobDAO.update({ jobId: jobId }, req.body);
    if (result) {
      res.status(200).json({ message: "job updated successfully", job: result });
    } else {
      res.status(500).json({ error: "can't update job" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};

exports.removeJob = async function (req, res) {
  try {
    if (!req.params.jobId) return res.status(400).json({ error: "request parameters required" });
    const jobId = parseInt(req.params.jobId);
    let jobData = await jobDAO.getOne({ jobId: jobId });
    if (!jobData) return res.status(404).json({ error: "Job not found" });
    if (req.user && req.user.role !== 'admin' && req.user.userId !== jobData.postedBy) {
      return res.status(403).json({ error: 'forbidden' });
    }
    let result = await jobDAO.delete({ jobId: jobId });
    if (result) {
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(500).json({ error: "can't delete job" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};

// Apply to a job - creates a job application record
exports.applyToJob = async function (req, res, next) {
  try {
    if (!req.params.jobId) return res.status(400).json({ error: "request parameters required" });
    const jobId = parseInt(req.params.jobId);
    let jobData = await jobDAO.getOne({ jobId: jobId });
    if (!jobData) return res.status(404).json({ error: "Job not found" });
    // build application object
    var app = {
      jobId: jobId,
      studentId: req.body.studentId || (req.user ? req.user.userId : undefined),
      employerId: jobData.postedBy,
      resumeUrl: req.body.resumeUrl,
      coverLetter: req.body.coverLetter,
      attachments: req.body.attachments || [],
      status: 'applied',
    };
    var Id = await applicationDAO.getNextSequence();
    app.applicationId = parseInt(Id) + 1;
    let result = await applicationDAO.create(app);
    if (result) {
      res.status(200).json({ message: 'application submitted', application: result });
    } else {
      res.status(500).json({ error: "can't submit application" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'internal error' });
  }
};
