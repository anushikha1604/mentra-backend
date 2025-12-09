const Student = require("../model/student");
// const User = require("../model/user");

module.exports = {
    create: async function (data) {
        const student = new Student(data);
        return await student.save();
    },

    get: async function (query) {
        return await Student.find(query, {
            userId: 1,
            studentId: 1,
            collageId: 1,
            collageName: 1,
            course: 1,
            year: 1,
            fullName: 1,
            emailId: 1,
            primaryPhone: 1,
            alternatePhone: 1,
            role: 1,
            password: 1,
            address: 1,
            city: 1,
            state: 1,
            country: 1,
            pincode: 1,
            DOB: 1,
            gender: 1,
            skills: 1,
            wishlistCompanies: 1,
            resume: 1,
            role: 1,
            appliedJobs: 1,
            agreeTerms: 1,
            isPlaced: 1,
            isDeleted: 1,
            isActive: 1,
            createdBy: 1,
            updatedBy: 1,
            createdAt: 1,
            updatedAt: 1,
        });
    },

    // getOne: async function (query) {
    //     return await Student.findOne(query, {
    //         userId: 1,
    //         studentId: 1,
    //         collegeId: 1,
    //         collegeName: 1,
    //         course: 1,
    //         year: 1,
    //         fullName: 1,
    //         emailId: 1,
    //         primaryPhone: 1,
    //         alternatePhone: 1,
    //         role: 1,
    //         password: 1,
    //         address: 1,
    //         city: 1,
    //         state: 1,
    //         country: 1,
    //         pincode: 1,
    //         DOB: 1,
    //         gender: 1,
    //         skills: 1,
    //         wishlistCompanies: 1,
    //         agreeTerms: 1,
    //         isPlaced: 1,
    //         isDeleted: 1,
    //         isActive: 1,
    //         createdBy: 1,
    //         updatedBy: 1,
    //         createdAt: 1,
    //         updatedAt: 1,
    //     });
    // },

    getOne: async function (query) {
        return await Student.findOne(query, {
            userId: 1,
            studentId: 1,
            collageId: 1,
            collageName: 1,
            course: 1,
            year: 1,
            fullName: 1,
            emailId: 1,
            primaryPhone: 1,
            alternatePhone: 1,
            role: 1,
            password: 1,
            address: 1,
            city: 1,
            state: 1,
            country: 1,
            pincode: 1,
            DOB: 1,
            gender: 1,
            skills: 1,
            wishlistCompanies: 1,
            resume: 1,
            role: 1,
            appliedJobs: 1,
            agreeTerms: 1,
            isPlaced: 1,
            isDeleted: 1,
            isActive: 1,
            createdBy: 1,
            updatedBy: 1,
            createdAt: 1,
            updatedAt: 1,
        });
    },

    getById: async function (query) {
        return await Student.findOne(query, {
            userId: 1,
            studentId: 1,
            collageId: 1,
            collageName: 1,
            course: 1,
            year: 1,
            fullName: 1,
            emailId: 1,
            primaryPhone: 1,
            alternatePhone: 1,
            role: 1,
            password: 1,
            address: 1,
            city: 1,
            state: 1,
            country: 1,
            pincode: 1,
            DOB: 1,
            gender: 1,
            skills: 1,
            wishlistCompanies: 1,
            resume: 1,
            role: 1,
            appliedJobs: 1,
            agreeTerms: 1,
            isPlaced: 1,
            isDeleted: 1,
            isActive: 1,
            createdBy: 1,
            updatedBy: 1,
            createdAt: 1,
            updatedAt: 1,
        });
    },

    update: async function (query, updateData) {
        return await Student.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true }
        );
    },

    delete: async function (query) {
        return await Student.findOneAndDelete(query);
    },

    applyToJob: async function (studentId, jobId) {
        const student = await Student.findById(studentId);
        if (!student) return null;
        if (student.appliedJobs.some(a => a.job.toString() === jobId)) {
            return student; // Already applied
        }
        student.appliedJobs.push({ job: jobId });
        return await student.save();
    },

    toggleWishlist: async function (studentId, company) {
        const student = await Student.findById(studentId);
        if (!student) return null;
        const idx = student.wishlistCompanies.indexOf(company);
        if (idx >= 0) {
            student.wishlistCompanies.splice(idx, 1);
        } else {
            student.wishlistCompanies.push(company);
        }
        return await student.save();
    },
};
