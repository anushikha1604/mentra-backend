var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
        userId: {
            type: String,
            unique: true,
            index: true,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        primaryPhone: {
            type: String,
            required: true,
            minlength: 10,
        },
        alternatePhone: {
            type: String,
            required: false,
            minlength: 10,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ["student", "institute", "admin"],
            default: "institute",
        },
        collageId: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        pincode: {
            type: String,
            required: false,
        },
        // resetPasswordToken: {
        //     type: String,
        //     required: false,
        //     unique: false,
        //     select: false
        // },
        // resetPasswordExpires: {
        //     type: Date,
        //     required: false,
        //     unique: false,
        //     select: false
        // },
        createdBy: {
            type: String,
            unique: false,
            index: false,
        },
        updatedBy: {
            type: String,
            unique: false,
            index: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model("User", userSchema);
