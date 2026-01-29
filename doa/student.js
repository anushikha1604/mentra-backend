// var mongoose = require("mongoose");
var student = require("../model/student");

module.exports = {
    create: async function (data) {
        var student = new this(data);
        let result = await student.save();
        return result;
    },
    get: async function (query) {
        let result = await student.find(query, {
            userId: 1,
            studentId: 1,
            collegeId: 1,
            collegeName: 1,
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
        return result;
    },

    getOne: async function (query) {
        let result = await student.findOne(query, {
            userId: 1,
            studentId: 1,
            collegeId: 1,
            collegeName: 1,
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
        return result;
    },

    getById: async function (query) {
        let result = await student.findOne(query, {
            userId: 1,
            studentId: 1,
            collegeId: 1,
            collegeName: 1,
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
        return result;
    },

    update: async function (query, updateData) {
        return await student.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true }
        );
    },

    delete: async function (query) {
        return await student.findOneAndDelete(query);
    },
};

