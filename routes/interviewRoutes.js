const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/interviewController");

// schedule interview
router.post("/", ctrl.schedule);

// list interviews for a student
router.get("/student/:studentId", ctrl.listByStudent);

// update interview
router.put("/:id", ctrl.update);

module.exports = router;
