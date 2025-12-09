// const express = require("express");
// const router = express.Router();
var studentProfile = require("../controller/studentController");

module.exports = function (router) {
    // create student profile
    router.post("/createstudent", studentProfile.createStudent);
    // fetch profile
    router.get("/:id", studentProfile.getStudent);

    // update profile
    router.put("/:id", studentProfile.updateStudent);

    // apply for a job
    router.post("/:id/apply", studentProfile.applyToJob);

    // toggle wishlist company
    router.post("/:id/wishlist", studentProfile.toggleWishlist);

    // module.exports = router;
};