const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/jobController");

// list & search jobs
router.get("/", ctrl.listJobs);

// post job (company)
router.post("/", ctrl.postJob);

// get job
router.get("/:id", ctrl.getJob);

// update job
router.put("/:id", ctrl.updateJob);

// delete/deactivate job
router.delete("/:id", ctrl.deleteJob);

// get applicants
router.get("/:id/applicants", ctrl.getApplicants);

module.exports = router;
