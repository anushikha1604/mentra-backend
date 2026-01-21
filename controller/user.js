var userprofile = require("../doa/user");
var User = require("../model/user");
var password = require("../doa/resetpassword");
var log = require("../logger");
var emailService = require("./email-sender");
var datetime = new Date();
var bcrypt = require("bcrypt");
// var exportDoc = require("./export-documents"); // Commented out - file doesn't exist
var fs = require("fs");

// userprofile getby userId etails

// exports.createUser = async function (req, res, next) {
//     if (req.body != null && req.body != undefined) {
//         var emailId = req.body.emailId;
//     } else {
//         res.status(400).json({ error: "request body required" });
//     }
//     let userData = await userprofile.getOne({ emailId: emailId });
//     // console.log("user data: ", userData);
//     if (userData == null && userData == undefined) {
//         // let lastUser = await userprofile.getOne({}, { userId: 1 }, { sort: { userId: -1 } });
//         if (req.body !== null && req.body !== undefined) {
//             // console.log("body", req.body);
//             let nextId;
//             if (userData && userData.userId) {
//                 // Extract numeric part from "USER001"
//                 const lastIdNum = parseInt(lastUser.userId.replace("USER", "")) || 0;
//                 nextId = "USER" + (lastIdNum + 1).toString().padStart(3, "0");
//             } else {
//                 // First user case
//                 nextId = "USER001";
//             }
//             var newuser = {
//                 userId: nextId,
//                 fullName: req.body.name,
//                 emailId: req.body.emailId,
//                 primaryPhone: req.body.phoneNumber,
//                 alternatePhone: req.body.alternatePhone,
//                 address: req.body.address,
//                 city: req.body.city,
//                 state: req.body.state,
//                 country: req.body.country,
//                 pincode: req.body.pincode,
//                 password: bcrypt.hashSync(req.body.password, 10),
//                 confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
//                 role: req.body.role,
//                 gender: req.body.gender,
//                 collegeId: req.body.collegeId,
//                 studentId: req.body.studentId,
//                 collegeName: req.body.collegeName,
//                 course: req.body.course,
//                 year: req.body.year,
//                 wishlistCompany: req.body.wishlistCompany,
//                 agreeTerms: req.body.agreeTerms,
//                 // profileImage: req.body.profileImage,
//                 DOB: req.body.dob,
//                 isActive: true,
//                 isDeleted: false,
//                 createdBy: "admin",
//                 updatedBy: "admin",
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             };
//             log.info("creating userprofile =====> ");
//             let result = await userprofile.create(newuser);
//             if (result) {
//                 res.status(200).json({ message: "userprofile created successfully" });
//             } else {
//                 res.status(500).json({ error: "can't create userprofile" });
//             }
//         } else {
//             res.status(400).json({ error: "request body required" });
//         }
//     } else {
//         res.status(400).json({ error: "userprofile data already exist" });
//     }
// };

exports.createUser = async function (req, res, next) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "request body required" });
        }
        const emailId = req.body.emailId;
        if (!emailId) {
            return res.status(400).json({ error: "emailId is required" });
        }

        // ✅ Check duplicate email
        let existingUser = await userprofile.getOne({ emailId: emailId });
        console.log("existingUser", existingUser);
        if (existingUser) {
            if (existingUser.collegeId === req.body.collegeId) {
                return res.status(400).json({ error: "userprofile already exists with this college Id" });
            }
            return res.status(400).json({ error: "userprofile already exists with this email" });
        }

        // ✅ Generate next userId
        let lastUser = await User.findOne().sort({ userId: -1 }).lean();
        console.log("lastUser", lastUser);
        let nextId;
        if (lastUser && lastUser.userId) {
            const lastIdNum = parseInt(lastUser.userId.replace("USER", "")) || 0;
            nextId = "USER" + (lastIdNum + 1).toString().padStart(3, "0");
        } else {
            nextId = "USER001";
        }
        console.log("Generated userId:", nextId);

        // ✅ Create new user
        const newuser = {
            userId: nextId,
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
            // gender: req.body.gender,
            collegeId: req.body.collegeId,
            // studentId: req.body.studentId,
            // collegeName: req.body.collegeName,
            // course: req.body.course,
            // year: req.body.year,
            // wishlistCompany: req.body.wishlistCompany,
            agreeTerms: req.body.agreeTerms,
            // DOB: req.body.dob,
            isActive: true,
            isDeleted: false,
            createdBy: "admin",
            updatedBy: "admin",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log("creating userprofile =====> ");
        let result = await userprofile.create(newuser);
        console.log("User creation result:", result);
        return res.status(200).json({ message: "userprofile created successfully" });

    } catch (err) {
        console.error("Error creating user: ", err);
        return res.status(500).json({ error: err.message || "internal server error" });
    }
};

// get all userprofile details
exports.getUsers = async function (req, res, next) {
    let result = await userprofile.get({});
    if (result) {
        res.status(200).json({ userprofiles: result });
    } else {
        res.status(500).json({ error: "No data found" });
    }
};

exports.getUserById = async function (req, res, next) {
    if (req.params.userId != null && req.params.userId != undefined) {
        var userId = req.params.userId;
    } else {
        res.json({ error: "request parameters required" });
    }
    let result = await userprofile.getById({ userId: userId });
    if (result) {
        res.status(200).json({ userprofile: result });
    } else {
        res.status(500).json({ error: "Id not found" });
    }
};

// update userprofile detail
exports.updateUser = async function (req, res, next) {
    if (req.params != null && req.params != undefined) {
        var userId = req.params.userId;
    } else {
        res.status(400).json({ error: "request parameters required" });
    }
    let userData = await userprofile.getOne({ userId: userId });
    if (userData) {
        if (req.body !== null && req.body !== undefined) {
            console.log("body", req.body);
            const emailId = req.body.emailId;
            // if (!emailId) {
            //     return res.status(400).json({ error: "emailId is required" });
            // }

            // ✅ Check duplicate email
            let existingUser = await userprofile.findOne({ emailId: emailId }).lean();
            console.log("existingUser", existingUser);
            if (existingUser) {
                if (existingUser.studentId === req.body.studentId) {
                    return res.status(400).json({ error: "userprofile already exists with this studentId" });
                }
                return res.status(400).json({ error: "userprofile already exists with this email" });
            } else {
                var newuser = {
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
                    // gender: req.body.gender,
                    collegeId: req.body.collegeId,
                    // studentId: req.body.studentId,
                    // collegeName: req.body.collegeName,
                    // course: req.body.course,
                    // year: req.body.year,
                    // wishlistCompany: req.body.wishlistCompany,
                    agreeTerms: req.body.agreeTerms,
                    // DOB: req.body.dob,
                    isActive: true,
                    isDeleted: false,
                    // createdBy: "admin",
                    updatedBy: "admin",
                    // createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),

                }
            };
            log.info("Updating userprofile =====> ");
            let result = await userprofile.update({ userId: userId }, newuser);
            if (result) {
                res.status(200).json({ message: "userprofile updated successfully" });
            } else {
                res.status(500).json({ error: "can't update userprofile" });
            }
        } else {
            res.status(400).json({ error: "request body required" });
        }
    } else {
        res.status(400).json({ error: "userprofile data not found" });
    }
};

exports.updatePassword = async function (req, res, next) {
    if (req.params.userId != null && req.params.userId != undefined) {
        var userId = parseInt(req.params.userId);
    } else {
        res.status(400).json({ error: "request parameters required" });
    }
    if (req.body !== null && req.body !== undefined) {
        let user = await userprofile.getOne({ userId: req.params.userId });
        if (user) {
            if (!bcrypt.compareSync(req.body.currentPassword, user.password)) {
                log.info("current password doesn't matched ===== ");
                res.status(400).json({ error: "current password doesn't matched" });
            } else {
                if (req.body.confirmPassword == null) {
                    res.status(400).json({ error: "confirm password is required" });
                } else {
                    if (req.body.confirmPassword !== req.body.newPassword) {
                        //console.log("confirm");
                        log.info("confirm password doesn't matched ===== ");
                        res.status(400).json({ error: "confirm password doesn't matched" });
                    } else {
                        let updateKey = {
                            password: bcrypt.hashSync(req.body.newPassword, 10),
                            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
                        };
                        log.info("Updating onboard ===== ");
                        let result = await userprofile.update({ userId: userId }, updateKey);
                        if (result) {
                            res.status(200).json({ message: "Password Updated successfully" });
                        } else {
                            res.status(500).json({ error: "can't update password" });
                        }
                    }
                }
            }
        } else {
            res.status(400).json({ error: "user not found " });
        }
    } else {
        res.status(400).json({ error: "request body required" });
    }
};

exports.exportDocument = async (req, res, next) => {
    if (req.params != null && req.params != undefined) {
        var exportType = JSON.parse(req.params.exportType);
        var kitchenId = req.params.kitchenId;
        var userId = req.params.userId;
    } else {
        res.status(400).json({ error: "request parameters required" });
    }
    try {
        let result = await userprofile.get({
            userId: userId,
            kitchenId: kitchenId,
        });
        var filePath;
        const fileName = kitchenId + "_" + userId + "userprofile";
        const fields = [
            "userId",
            "emailId",
            "role",
            "kitchenId",
            "name",
            "details",
            "lisencekey",
            "updatedBy",
        ];
        if (exportType === "csv") {
            filePath = await exportDoc.getCSV(result, fields, fileName);
            res.download(filePath, function (err) {
                if (err) {
                    console.log(err);
                }
                fs.unlink(filePath, function () {
                    console.log("File was deleted");
                });
            });
            return "successfully downloaded";
        } else if (exportType === "xlsx") {
            filePath = await exportDoc.getXLSX(result, fields, fileName);
            res.download(filePath, function (err) {
                if (err) {
                    console.log(err);
                }
                fs.unlink(filePath, function () {
                    console.log("File was deleted");
                });
            });
            return "successfully downloaded";
        } else if (exportType === "pdf") {
            filePath = await exportDoc.getPdf(result, fileName, "userprofile");
            res.download(filePath, function (err) {
                if (err) {
                    console.log(err);
                }
                fs.unlink(filePath, function () {
                    console.log("File was deleted");
                });
            });
            return "successfully downloaded";
        } else {
            console.log("Unsupported File Type");
        }
    } catch (err) {
        console.error(err);
    }
};

exports.forgetPassword = async function (req, res, next) {
    try {
        if (req.body !== undefined && req.body !== null) {
            let user = await userprofile.getOne({ emailId: req.body.emailId });
            if (user) {
                let otp = generateOTP();
                let resetPassword = {
                    emailId: user.emailId,
                    OTP: otp,
                };

                // Generate reset link - kitchenId might not exist in user schema
                const baseUrl = process.env.BASE_URL || "http://localhost:3000";
                let obj = {
                    type: "resetpassword",
                    otp: otp,
                    loginlink: `${baseUrl}/user/${user.userId}/resetpassword`,
                };
                console.log("Reset password link:", obj.loginlink);

                // Check if SendGrid is configured
                if (!process.env.SENDGRID_API_KEY || !process.env.sendFrom) {
                    console.warn("SendGrid not configured - email sending skipped");
                    log.info("Email service not configured, but OTP generated: " + otp);
                } else {
                    let serviceRes = await emailService.sendEmailNew(
                        user.emailId,
                        "Password Reset Request - Mentra Portal",
                        obj,
                    );
                    log.info("email service response === " + serviceRes);
                }

                res.status(200).json({
                    message: "A reset link has been sent to your email",
                    userId: user.userId,
                    ...(process.env.NODE_ENV === 'development' && { otp }) // Show OTP in dev mode
                });

                let newData = await password.getOne({ emailId: req.body.emailId });
                if (newData) {
                    await password.update({ emailId: req.body.emailId }, resetPassword);
                } else {
                    await password.create(resetPassword);
                }
            } else {
                log.error(datetime + " === " + "error");
                res.status(404).json({ error: "user not found" });
            }
        } else {
            res.status(400).json({ error: "required request body" });
        }
    } catch (e) {
        console.error("Error in forgetPassword:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

function generateOTP() {
    var length = 4,
        charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

exports.resetPassword = async function (req, res, next) {
    if (req.params.userId != null && req.params.userId != undefined) {
        var userId = parseInt(req.params.userId);
    } else {
        res.status(400).json({ error: "request parameters required" });
    }
    if (req.body !== null && req.body !== undefined) {
        let user = await userprofile.getOne({ userId: req.params.userId });

        if (user) {
            let otpObj = await password.getOne({ emailId: user.emailId });
            if (otpObj) {
                if (req.body.otp == null) {
                    res.status(400).json({ error: "OTP is required" });
                } else {
                    if (req.body.otp != otpObj.OTP) {
                        log.info("OTP doesn't matched ===== ");
                        res.status(400).json({ error: "OTP doesn't matched" });
                    } else {
                        if (req.body.confirmPassword == null) {
                            res.status(400).json({ error: "confirm password is required" });
                        } else {
                            if (req.body.confirmPassword !== req.body.newPassword) {
                                log.info("confirm password doesn't matched ===== ");
                                res
                                    .status(400)
                                    .json({ error: "confirm password doesn't matched" });
                            } else {
                                let updateKey = {
                                    password: bcrypt.hashSync(req.body.newPassword, 10),
                                };
                                log.info("Updating onboard ===== ");
                                let result = await userprofile.update(
                                    { userId: userId },
                                    updateKey,
                                );
                                if (result) {
                                    await password.deleteOne({ emailId: user.emailId });
                                    res
                                        .status(200)
                                        .json({ message: "Password Updated successfully" });
                                } else {
                                    res.status(500).json({ error: "can't update password" });
                                }
                            }
                        }
                    }
                }
            } else {
                res.status(400).json({ error: "OTP has been expired" });
            }
        } else {
            res.status(400).json({ error: "user not found " });
        }
    } else {
        res.status(400).json({ error: "request body required" });
    }
};
