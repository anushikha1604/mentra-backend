const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/applicationController");

// apply for a job
router.post("/apply", ctrl.apply);

// get applications by student
router.get("/student/:studentId", ctrl.getApplicationsByStudent);

// update application status
router.put("/:id/status", ctrl.updateStatus);

module.exports = router;
