// const express = require("express");
// const router = express.Router();
var Student = require("../controller/student");

module.exports = function (router) {
    // create student profile
    router.post("/createstudent", Student.createStudent);
    // fetch profile
    router.get(
        "/student/:id", Student.getStudentById
    );
    // fetch all students

    router.get(
        "/students", Student.getAllStudents
    );

    // update profile
    router.put("/student/:id", Student.updateStudent);

    // delete profile
    router.delete("/student/:id", Student.deleteStudent);

    // apply for a job
    // router.post("/:id/apply", Student.applyToJob);

    // toggle wishlist company
    // router.post("/:id/wishlist", Student.toggleWishlist);

    // module.exports = router;
};