const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/enquiryController");

// create enquiry
router.post("/", ctrl.createEnquiry);

// list by student
router.get("/student/:studentId", ctrl.listByStudent);

// respond to enquiry
router.put("/:id/respond", ctrl.respond);

// close enquiry
router.put("/:id/close", ctrl.close);

module.exports = router;
