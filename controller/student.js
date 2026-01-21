const Student = require("../doa/student");
const studentModel = require("../model/student");
// var datetime = new Date();
var bcrypt = require("bcrypt");

// const User = require("../model/user");

// exports.createStudent = async (req, res) => {
//     try {
//         const payload = req.body;
//         if (!payload) return res.status(400).json({ error: "user is required" });
//         const userExists = await Student.findOne();
//         if (!userExists) return res.status(404).json({ error: "user not found" });
//         const exists = await Student.findOne({ user: payload.userId});
//         if (exists) return res.status(409).json({ error: "student profile already exists" });
//         const student = await Student.create(payload);
//         return res.status(201).json({ data: student });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

exports.createStudent = async function (req, res, next) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "request body required" });
        }

        const emailId = req.body.emailId;
        if (!emailId) {
            return res.status(400).json({ error: "emailId is required" });
        }

        // ✅ Check duplicate email
        let existingStudent = await Student.getOne({ emailId: emailId });
        console.log("existingStudent", existingStudent);
        if (existingStudent) {
            if (existingStudent.studentId === req.body.studentId) {
                return res.status(400).json({ error: "userprofile already exists with this studentId" });
            }
            return res.status(400).json({ error: "userprofile already exists with this email" });
        }

        // ✅ Generate next userId
        let lastStudent = await studentModel.findOne().sort({ userId: -1 }).lean();
        console.log("lastStudent", lastStudent);
        let nextId;
        if (lastStudent && lastStudent.userId) {
            const lastIdNum = parseInt(lastStudent.userId.replace("USER", "")) || 0;
            nextId = "USER" + (lastIdNum + 1).toString().padStart(3, "0");
        } else {
            nextId = "USER001";
        }
        console.log("Generated userId:", nextId);

        // ✅ Create new user
        const newStudent = {
            userId: nextId,
            studentId: req.body.studentId,
            collegeId: req.body.collegeId,
            collegeName: req.body.collegeName,
            course: req.body.course,
            year: req.body.year,
            fullName: req.body.fullName,
            emailId: emailId,
            primaryPhone: req.body.primaryPhone,
            alternatePhone: req.body.alternatePhone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            password: bcrypt.hashSync(req.body.password, 10),
            // confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
            role: req.body.role,
            gender: req.body.gender,
            skills: req.body.skills,
            wishlistCompanies: req.body.wishlistCompanies,
            agreeTerms: req.body.agreeTerms,
            DOB: req.body.DOB,
            isActive: true,
            isDeleted: false,
            createdBy: "admin",
            updatedBy: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log("creating userprofile =====> ");
        let result = await Student.create(newStudent);
        console.log("Created userprofile:", result);
        return res.status(200).json({ message: "userprofile created successfully" });

    } catch (err) {
        console.error("Error creating user: ", err);
        return res.status(500).json({ error: err.message || "internal server error" });
    }
};


exports.getStudentByStudentId = async (req, res) => {
    try {
        const student = await Student.getById({ studentId: req.params.id });
        if (!student) return res.status(404).json({ error: "student not found" });
        return res.status(200).json({ data: student });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getStudentByUserId = async (req, res) => {
    try {
        const student = await Student.getById({ userId: req.params.id });
        if (!student) return res.status(404).json({ error: "student not found" });
        return res.status(200).json({ data: student });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.get({});

        if (!students || students.length === 0) {
            return res.status(404).json({ error: "Students not found" });
        }

        return res.status(200).json({ data: students });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// exports.getStudents = async function (req, res, next) {
//     let result = await Student.get({});
//     if (result) {
//         res.status(200).json({ Student: result });
//     } else {
//         res.status(500).json({ error: "No data found" });
//     }
// };


exports.updateStudent = async (req, res) => {
    try {
        const updates = req.body;
        const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!student) return res.status(404).json({ error: "student not found" });
        return res.status(200).json({ data: student });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        if (!jobId) return res.status(400).json({ error: "jobId required" });
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "student not found" });
        if (student.appliedJobs.some(a => a.job.toString() === jobId)) {
            return res.status(409).json({ error: "already applied" });
        }
        student.appliedJobs.push({ job: jobId });
        await student.save();
        return res.status(200).json({ data: student });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.toggleWishlist = async (req, res) => {
    try {
        const { company } = req.body;
        if (!company) return res.status(400).json({ error: "company required" });
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "student not found" });
        const idx = student.wishlistCompanies.indexOf(company);
        if (idx >= 0) student.wishlistCompanies.splice(idx, 1);
        else student.wishlistCompanies.push(company);
        await student.save();
        return res.status(200).json({ data: student });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
