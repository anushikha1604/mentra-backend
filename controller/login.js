var User = require("../doa/user");
// var employee = require("../doa/user");
var log = require("../logger");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.getLogin = async function (req, res, next) {
  log.info("Inside Login == " + req.body.emailId);
  var responseObject = {};
  let verification = await new Promise(async (resolve, reject) => {
    let user = await User.getOne({ emailId: req.body.emailId });
    if (user) {
      // console.log(user);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // console.log("user role", user.role);
        const token = jwt.sign(
          {
            emailId: req.body.emailId,
            role: user.role,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          },
        );
        if (
          user.role == "student" ||
          user.role == "admin" ||
          user.role == "superadmin"
        ) {
          let data = await User.getOne({ emailId: req.body.emailId });
          responseObject.code = 200;
          responseObject.body = {
            message: "Authorized",
            token: token,
            userDetails: user,
            accessControl: data.accessControl,
            // details: data,
          };
          resolve(responseObject);
        } else {
          responseObject.code = 200;
          responseObject.body = {
            message: "Authorized",
            token: token,
            userDetails: user,
          };
          resolve(responseObject);
        }
      } else {
        responseObject.code = 401;
        responseObject.body = { message: "Unauthorized" };
        resolve(responseObject);
      }
    } else {
      res.json({
        error:
          "Enquiry with this Email does not exist.Team will get back to you soon !",
      });
      // responseObject.code = 500;
      // responseObject.body = 'Unable to Connect Database'
      // reject(responseObject);
    }
  });
  res.status(verification.code).json(verification.body);
};

// exports.getEmployeeLogin = async function (req, res, next) {
//     log.info("Inside Login == " + req.body.emailId);
//     var responseObject = {}
//     let verification = await new Promise(async (resolve, reject) => {
//         let user = await employee.getOne({ emailId: req.body.emailId });
//         if (user) {
//             if (bcrypt.compareSync(req.body.password, user.password)) {
//                 const token = jwt.sign({
//                     emailId: req.body.emailId,
//                     role: user.role
//                 }, process.env.JWT_KEY, {
//                     expiresIn: "2h",
//                 })
//                 responseObject.code = 200;
//                 responseObject.body = { 'message': 'Authorized', 'token': token, 'userDetails': user }
//                 resolve(responseObject);

//             } else {
//                 responseObject.code = 401;
//                 responseObject.body = { 'message': 'Unauthorized' }
//                 resolve(responseObject);
//             }
//         }
//         else {
//             res.json({ error: "Enquiry with this Email does not exist.Team will get back to you soon !" });
//             // responseObject.code = 500;
//             // responseObject.body = 'Unable to Connect Database'
//             // reject(responseObject);
//         }
//     })
//     res.status(verification.code).json(verification.body);
// }
