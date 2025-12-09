var Employee = require("../doa/employee");
var User = require("../doa/user");
var bcrypt = require("bcrypt");
var emailService = require("./email-sender");
var log = require("../logger");
var datetime = new Date();
// var exportDoc = require("./export-documents"); // Commented out - file doesn't exist
var fs = require("fs");

//create employee
exports.createEmployee = async function (req, res, next) {
  try {
    if (req.params != null && req.params != undefined) {
      var adminId = req.params.adminId;
      var kitchenId = req.params.kitchenId;
    } else {
      res.json({ error: "request parameters required" });
    }
    if (req.body !== undefined && req.body !== null) {
      let employee = await Employee.getOne({ emailId: req.body.emailId });
      if (employee) {
        res
          .status(500)
          .json({
            error:
              "Employee with this Email already exist.Team will get back to you soon !",
          });
      } else {
        if (req.body.role == "chef") {
          if (req.body.employeeConfig == null) {
            res.json({ error: "request body required" });
          } else {
            // let otp = generatePassword()
            let employeeId = await getNextSequence();
            var employeeObj = {
              employeeId: parseInt(employeeId) + 1,
              kitchenId: kitchenId,
              adminId: adminId,
              Name: req.body.Name,
              emailId: req.body.emailId,
              mobileNumber: req.body.mobileNumber,
              role: req.body.role,
              employeeConfig: req.body.employeeConfig,
              schedule: {
                sunday: {
                  morningTimeSlotStart:
                    req.body.schedule.sunday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.sunday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.sunday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.sunday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.sunday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.sunday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.sunday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.sunday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.sunday.morningTimeSlot,
                  afterNoonTimeSlot: req.body.schedule.sunday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.sunday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.sunday.nightTimeSlot,
                },
                monday: {
                  morningTimeSlotStart:
                    req.body.schedule.monday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.monday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.monday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.monday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.monday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.monday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.monday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.monday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.monday.morningTimeSlot,
                  afterNoonTimeSlot: req.body.schedule.monday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.monday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.monday.nightTimeSlot,
                },
                tuesday: {
                  morningTimeSlotStart:
                    req.body.schedule.tuesday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.tuesday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.tuesday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.tuesday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.tuesday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.tuesday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.tuesday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.tuesday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.tuesday.morningTimeSlot,
                  afterNoonTimeSlot:
                    req.body.schedule.tuesday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.tuesday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.tuesday.nightTimeSlot,
                },
                wednesday: {
                  morningTimeSlotStart:
                    req.body.schedule.wednesday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.wednesday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.wednesday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.wednesday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.wednesday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.wednesday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.wednesday.eveningTimeSlotEnd,
                  nightTimeSlotEnd:
                    req.body.schedule.wednesday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.wednesday.morningTimeSlot,
                  afterNoonTimeSlot:
                    req.body.schedule.wednesday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.wednesday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.wednesday.nightTimeSlot,
                },
                thursday: {
                  morningTimeSlotStart:
                    req.body.schedule.thursday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.thursday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.thursday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.thursday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.thursday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.thursday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.thursday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.thursday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.thursday.morningTimeSlot,
                  afterNoonTimeSlot:
                    req.body.schedule.thursday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.thursday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.thursday.nightTimeSlot,
                },
                friday: {
                  morningTimeSlotStart:
                    req.body.schedule.friday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.friday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.friday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.friday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.friday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.friday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.friday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.friday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.friday.morningTimeSlot,
                  afterNoonTimeSlot: req.body.schedule.friday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.friday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.friday.nightTimeSlot,
                },
                saturday: {
                  morningTimeSlotStart:
                    req.body.schedule.saturday.morningTimeSlotStart,
                  afterNoonTimeSlotStart:
                    req.body.schedule.saturday.afterNoonTimeSlotStart,
                  eveningTimeSlotStart:
                    req.body.schedule.saturday.eveningTimeSlotStart,
                  nightTimeSlotStart:
                    req.body.schedule.saturday.nightTimeSlotStart,
                  morningTimeSlotEnd:
                    req.body.schedule.saturday.morningTimeSlotEnd,
                  afterNoonTimeSlotEnd:
                    req.body.schedule.saturday.afterNoonTimeSlotEnd,
                  eveningTimeSlotEnd:
                    req.body.schedule.saturday.eveningTimeSlotEnd,
                  nightTimeSlotEnd: req.body.schedule.saturday.nightTimeSlotEnd,
                  morningTimeSlot: req.body.schedule.saturday.morningTimeSlot,
                  afterNoonTimeSlot:
                    req.body.schedule.saturday.afterNoonTimeSlot,
                  eveningTimeSlot: req.body.schedule.saturday.eveningTimeSlot,
                  nightTimeSlot: req.body.schedule.saturday.nightTimeSlot,
                },
              },
              // password: bcrypt.hashSync(otp, 10),
              accessControl: {
                order: "false",
                menu: "false",
                kpireports: "false",
                reports: "false",
                settings: "false",
              },
            };
            let results = await Employee.create(employeeObj);
            if (results) {
              let message = "employee added successfully";
              res.status(200).json({ message });
              let user = await User.getOne({ userId: req.body.userId });
              if (user) {
                res
                  .status(500)
                  .json({
                    error:
                      "User with this userId already exist.Team will get back to you soon !",
                  });
              } else {
                let otp = generatePassword();
                let userId = await getUserNextSequence();
                console.log(userId, parseInt(userId) + 1);
                var userObj = {
                  userId: parseInt(userId) + 1,
                  emailId: req.body.emailId,
                  password: bcrypt.hashSync(otp, 10),
                  role: req.body.role,
                  kitchenId: employeeObj.kitchenId,
                };
                let obj = {
                  type: "employee",
                  email: userObj.emailId,
                  password: otp,
                  loginlink: "http://15.185.206.228/kitchin/login",
                };
                let serviceRes = emailService.sendEmailNew(
                  userObj.emailId,
                  "Welcome User",
                  obj,
                );
                log.info("generating user ===== " + userObj);
                log.info("email service response === " + serviceRes);
                await User.create(userObj);
              }
            } else {
              log.error(datetime + " === " + results);
              res.status(500).json({ error: "employee not added" });
            }
          }
        } else {
          let employeeId = await getNextSequence();
          var employeeObj = {
            employeeId: parseInt(employeeId) + 1,
            kitchenId: kitchenId,
            adminId: adminId,
            Name: req.body.Name,
            emailId: req.body.emailId,
            mobileNumber: req.body.mobileNumber,
            role: req.body.role,
            schedule: {
              sunday: {
                morningTimeSlotStart:
                  req.body.schedule.sunday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.sunday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.sunday.eveningTimeSlotStart,
                nightTimeSlotStart: req.body.schedule.sunday.nightTimeSlotStart,
                morningTimeSlotEnd: req.body.schedule.sunday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.sunday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd: req.body.schedule.sunday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.sunday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.sunday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.sunday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.sunday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.sunday.nightTimeSlot,
              },
              monday: {
                morningTimeSlotStart:
                  req.body.schedule.monday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.monday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.monday.eveningTimeSlotStart,
                nightTimeSlotStart: req.body.schedule.monday.nightTimeSlotStart,
                morningTimeSlotEnd: req.body.schedule.monday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.monday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd: req.body.schedule.monday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.monday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.monday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.monday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.monday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.monday.nightTimeSlot,
              },
              tuesday: {
                morningTimeSlotStart:
                  req.body.schedule.tuesday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.tuesday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.tuesday.eveningTimeSlotStart,
                nightTimeSlotStart:
                  req.body.schedule.tuesday.nightTimeSlotStart,
                morningTimeSlotEnd:
                  req.body.schedule.tuesday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.tuesday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd:
                  req.body.schedule.tuesday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.tuesday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.tuesday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.tuesday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.tuesday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.tuesday.nightTimeSlot,
              },
              wednesday: {
                morningTimeSlotStart:
                  req.body.schedule.wednesday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.wednesday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.wednesday.eveningTimeSlotStart,
                nightTimeSlotStart:
                  req.body.schedule.wednesday.nightTimeSlotStart,
                morningTimeSlotEnd:
                  req.body.schedule.wednesday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.wednesday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd:
                  req.body.schedule.wednesday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.wednesday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.wednesday.morningTimeSlot,
                afterNoonTimeSlot:
                  req.body.schedule.wednesday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.wednesday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.wednesday.nightTimeSlot,
              },
              thursday: {
                morningTimeSlotStart:
                  req.body.schedule.thursday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.thursday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.thursday.eveningTimeSlotStart,
                nightTimeSlotStart:
                  req.body.schedule.thursday.nightTimeSlotStart,
                morningTimeSlotEnd:
                  req.body.schedule.thursday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.thursday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd:
                  req.body.schedule.thursday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.thursday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.thursday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.thursday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.thursday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.thursday.nightTimeSlot,
              },
              friday: {
                morningTimeSlotStart:
                  req.body.schedule.friday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.friday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.friday.eveningTimeSlotStart,
                nightTimeSlotStart: req.body.schedule.friday.nightTimeSlotStart,
                morningTimeSlotEnd: req.body.schedule.friday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.friday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd: req.body.schedule.friday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.friday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.friday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.friday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.friday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.friday.nightTimeSlot,
              },
              saturday: {
                morningTimeSlotStart:
                  req.body.schedule.saturday.morningTimeSlotStart,
                afterNoonTimeSlotStart:
                  req.body.schedule.saturday.afterNoonTimeSlotStart,
                eveningTimeSlotStart:
                  req.body.schedule.saturday.eveningTimeSlotStart,
                nightTimeSlotStart:
                  req.body.schedule.saturday.nightTimeSlotStart,
                morningTimeSlotEnd:
                  req.body.schedule.saturday.morningTimeSlotEnd,
                afterNoonTimeSlotEnd:
                  req.body.schedule.saturday.afterNoonTimeSlotEnd,
                eveningTimeSlotEnd:
                  req.body.schedule.saturday.eveningTimeSlotEnd,
                nightTimeSlotEnd: req.body.schedule.saturday.nightTimeSlotEnd,
                morningTimeSlot: req.body.schedule.saturday.morningTimeSlot,
                afterNoonTimeSlot: req.body.schedule.saturday.afterNoonTimeSlot,
                eveningTimeSlot: req.body.schedule.saturday.eveningTimeSlot,
                nightTimeSlot: req.body.schedule.saturday.nightTimeSlot,
              },
            },
            // password: bcrypt.hashSync(otp, 10),
            accessControl: {
              order: "false",
              menu: "false",
              kpireports: "false",
              reports: "false",
              settings: "false",
            },
          };
          let results = await Employee.create(employeeObj);
          if (results) {
            let message = "employee added successfully";
            res.status(200).json({ message });
            let user = await User.getOne({ userId: req.body.userId });
            if (user) {
              res
                .status(500)
                .json({
                  error:
                    "User with this userId already exist.Team will get back to you soon !",
                });
            } else {
              let otp = generatePassword();
              let userId = await getUserNextSequence();
              console.log(userId, parseInt(userId) + 1);
              var userObj = {
                userId: parseInt(userId) + 1,
                name: req.body.Name,
                emailId: req.body.emailId,
                password: bcrypt.hashSync(otp, 10),
                role: req.body.role,
                kitchenId: employeeObj.kitchenId,
              };
              let obj = {
                type: "employee",
                email: userObj.emailId,
                password: otp,
                loginlink: "http://15.185.206.228/kitchin/login",
              };
              let serviceRes = emailService.sendEmailNew(
                userObj.emailId,
                "Welcome User",
                obj,
              );
              log.info("generating user ===== " + userObj);
              log.info("email service response === " + serviceRes);
              await User.create(userObj);
            }
          } else {
            log.error(datetime + " === " + results);
            res.status(500).json({ error: "employee not added" });
          }
        }
      }
    } else {
      res.status(400).json({ error: "required reuqest body" });
    }
  } catch (e) {
    console.error(e);
  }
};

function getNextSequence() {
  return new Promise((resolve) => {
    return Employee.findOne()
      .sort([["employeeId", "descending"]])
      .limit(1)
      .exec((err, data) => {
        if (data != null) {
          if (data.employeeId != undefined) {
            return resolve(data.employeeId);
          } else {
            return resolve(0);
          }
        } else return resolve(0);
      });
  });
}

function getUserNextSequence() {
  return new Promise((resolve) => {
    return User.findOne()
      .sort([["userId", "descending"]])
      .limit(1)
      .exec((err, data) => {
        if (data != null) {
          if (data.userId != undefined) {
            return resolve(data.userId);
          } else {
            return resolve(0);
          }
        } else return resolve(0);
      });
  });
}

function generatePassword() {
  var length = 4,
    charset = "0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

//get all the employee's details present
exports.getEmployees = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    var adminId = req.params.adminId;
  } else {
    res.json({ error: "request parameters required" });
  }
  let result = await Employee.get({ adminId: adminId, kitchenId: kitchenId });
  if (result) {
    res.status(200).json({ employees: result });
  } else {
    res.status(400).json({ error: "data not found" });
  }
};

exports.getNameByRole = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    var role = req.params.role;
  } else {
    res.json({ error: "request parameters required" });
  }
  let result = await Employee.getName({ kitchenId: kitchenId, role: role });
  if (result) {
    res.status(200).json({ employees: result });
  } else {
    res.status(400).json({ error: "data not found" });
  }
};

//get category details based on employee name.
exports.getEmployeeById = async function (req, res, next) {
  if (req.params.employeeId != null && req.params.employeeId != undefined) {
    var employeeId = parseInt(req.params.employeeId);
    var kitchenId = req.params.kitchenId;
    var adminId = req.params.adminId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await Employee.getById({
    adminId: adminId,
    kitchenId: kitchenId,
    employeeId: employeeId,
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};

exports.getEmployeesByRole = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    var adminId = req.params.adminId;
    var role = req.params.role;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await Employee.get({
    adminId: adminId,
    kitchenId: kitchenId,
    role: role,
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};

exports.getAccessControlList = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    var employeeId = req.params.employeeId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await Employee.getList({
    employeeId: employeeId,
    kitchenId: kitchenId,
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};

//update employee detail
exports.updateEmployee = async function (req, res, next) {
  if (req.params.employeeId != null && req.params.employeeId != undefined) {
    var employeeId = parseInt(req.params.employeeId);
    var kitchenId = req.params.kitchenId;
    var adminId = req.params.adminId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let user = await Employee.getOne({
    employeeId: employeeId,
    kitchenId: kitchenId,
    adminId: adminId,
  });
  if (user) {
    if (req.body !== null && req.body !== undefined) {
      var email = user.emailId;
      let employee = await Employee.getOne({
        emailId: req.body.emailId,
        employeeId: { $ne: employeeId },
      });
      if (employee) {
        res
          .status(500)
          .json({
            error:
              "Employee with this Email already exist.Team will get back to you soon !",
          });
      } else {
        var newEmployee = {
          Name: req.body.Name,
          emailId: req.body.emailId,
          mobileNumber: req.body.mobileNumber,
          role: req.body.role,
          employeeConfig: req.body.employeeConfig,
          schedule: {
            sunday: {
              morningTimeSlotStart:
                req.body.schedule.sunday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.sunday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.sunday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.sunday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.sunday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.sunday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.sunday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.sunday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.sunday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.sunday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.sunday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.sunday.nightTimeSlot,
            },
            monday: {
              morningTimeSlotStart:
                req.body.schedule.monday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.monday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.monday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.monday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.monday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.monday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.monday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.monday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.monday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.monday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.monday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.monday.nightTimeSlot,
            },
            tuesday: {
              morningTimeSlotStart:
                req.body.schedule.tuesday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.tuesday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.tuesday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.tuesday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.tuesday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.tuesday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.tuesday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.tuesday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.tuesday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.tuesday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.tuesday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.tuesday.nightTimeSlot,
            },
            wednesday: {
              morningTimeSlotStart:
                req.body.schedule.wednesday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.wednesday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.wednesday.eveningTimeSlotStart,
              nightTimeSlotStart:
                req.body.schedule.wednesday.nightTimeSlotStart,
              morningTimeSlotEnd:
                req.body.schedule.wednesday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.wednesday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd:
                req.body.schedule.wednesday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.wednesday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.wednesday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.wednesday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.wednesday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.wednesday.nightTimeSlot,
            },
            thursday: {
              morningTimeSlotStart:
                req.body.schedule.thursday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.thursday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.thursday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.thursday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.thursday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.thursday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.thursday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.thursday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.thursday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.thursday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.thursday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.thursday.nightTimeSlot,
            },
            friday: {
              morningTimeSlotStart:
                req.body.schedule.friday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.friday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.friday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.friday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.friday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.friday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.friday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.friday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.friday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.friday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.friday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.friday.nightTimeSlot,
            },
            saturday: {
              morningTimeSlotStart:
                req.body.schedule.saturday.morningTimeSlotStart,
              afterNoonTimeSlotStart:
                req.body.schedule.saturday.afterNoonTimeSlotStart,
              eveningTimeSlotStart:
                req.body.schedule.saturday.eveningTimeSlotStart,
              nightTimeSlotStart: req.body.schedule.saturday.nightTimeSlotStart,
              morningTimeSlotEnd: req.body.schedule.saturday.morningTimeSlotEnd,
              afterNoonTimeSlotEnd:
                req.body.schedule.saturday.afterNoonTimeSlotEnd,
              eveningTimeSlotEnd: req.body.schedule.saturday.eveningTimeSlotEnd,
              nightTimeSlotEnd: req.body.schedule.saturday.nightTimeSlotEnd,
              morningTimeSlot: req.body.schedule.saturday.morningTimeSlot,
              afterNoonTimeSlot: req.body.schedule.saturday.afterNoonTimeSlot,
              eveningTimeSlot: req.body.schedule.saturday.eveningTimeSlot,
              nightTimeSlot: req.body.schedule.saturday.nightTimeSlot,
            },
          },
          accessControl: {
            order: req.body.accessControl.order,
            menu: req.body.accessControl.menu,
            kpireports: req.body.accessControl.kpireports,
            reports: req.body.accessControl.reports,
            settings: req.body.accessControl.settings,
          },
        };

        log.info("Updating Employee ===== ");
        let result = await Employee.update(
          { employeeId: employeeId, kitchenId: kitchenId, adminId: adminId },
          newEmployee,
        );
        if (result) {
          var newuser = {
            emailId: req.body.emailId,
          };
          await User.update({ emailId: email }, newuser);
          res.status(200).json({ message: "Employee updated successfully" });
        } else {
          res.status(500).json({ error: "can't update Employee" });
        }
      }
    } else {
      res.status(400).json({ error: "request body required" });
    }
  } else {
    res.status(400).json({ error: "user not found" });
  }
};

//remove employee
exports.removeEmployee = async function (req, res, next) {
  if (req.params.employeeId != null && req.params.employeeId != undefined) {
    var employeeId = parseInt(req.params.employeeId);
    var adminId = parseInt(req.params.adminId);
    var emailId = req.params.emailId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let user = await Employee.getOne({ employeeId: employeeId });
  if (user) {
    let result = await Employee.delete({
      employeeId: employeeId,
      adminId: adminId,
    });
    log.info("employee deletion started !");
    if (result) {
      log.info(datetime + " === " + result);
      log.info("user deletion started !");
      let data = await User.getOne({ emailId: emailId });
      if (data) {
        await User.delete({ emailId: emailId });
        res.status(200).json({ message: "Employee deleted successfully" });
      }
    } else {
      res.status(400).json({ error: "Id not found" });
    }
  } else {
    res.status(500).json({ error: "Employee with this Email does not exist!" });
  }
};
// exports.exportDocument = async (req, res, next) => {
//     if (req.params != null && req.params != undefined) {
//         var exportType = req.params.exportType;
//         var kitchenId = req.params.kitchenId;
//         var adminId = req.params.adminId;
//     } else {
//         res.status(400).json({ error: "request parameters required" });
//     }
//     try {
//         let result = await Employee.get({ "adminId": adminId, "kitchenId": kitchenId });
//         var filePath;
//         const fileName = kitchenId + "_" + adminId + "Employee";
//         const fields = ['kitchenId', 'adminId', 'Name', 'emailId', 'mobileNumber', 'role', 'employeeConfig', 'schedule', 'accessControl'];
//         if (exportType === "csv") {
//             filePath = await exportDoc.getCSV(result, fields, fileName);
//             res.download(filePath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 fs.unlink(filePath, function () {
//                     console.log("File was deleted")
//                 });
//             });
//             return "successfully downloaded";
//         } else if (exportType === "xlsx") {
//             filePath = await exportDoc.getXLSX(result, fields, fileName);
//             res.download(filePath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 fs.unlink(filePath, function () {
//                     console.log("File was deleted")
//                 });
//             });
//             return "successfully downloaded";
//         } else if (exportType === "pdf") {
//             filePath = await exportDoc.getPdf(result, fileName, 'Employee');
//             res.download(filePath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 fs.unlink(filePath, function () {
//                     console.log("File was deleted")
//                 });
//             });
//             return "successfully downloaded";
//         } else {
//             console.log("Unsupported File Type")
//         }
//     } catch (err) {
//         console.error(err);
//     }
// }

exports.exportDocument = async (req, res, next) => {
  if (req.params != null && req.params != undefined) {
    console.log("req.params.exportType ----" + req.params.exportType);
    var exportType = req.params.exportType;
    var kitchenId = req.params.kitchenId;
    var adminId = req.params.adminId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  try {
    let result = await Employee.get({ adminId: adminId, kitchenId: kitchenId });
    var filePath;
    const fileName = kitchenId + "_" + adminId + "Employee";
    const fields = [
      "kitchenId",
      "adminId",
      "Name",
      "emailId",
      "mobileNumber",
      "role",
      "employeeConfig",
      "schedule",
      "accessControl",
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
      filePath = await exportDoc.getPdf(result, fields, "Employee");
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

exports.updatePassword = async function (req, res, next) {
  if (req.params.employeeId != null && req.params.employeeId != undefined) {
    var employeeId = parseInt(req.params.employeeId);
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  try {
    if (req.body !== null && req.body !== undefined) {
      let user = await Employee.getOne({ employeeId: req.params.employeeId });
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
              res
                .status(400)
                .json({ error: "confirm password doesn't matched" });
            } else {
              let updateKey = {
                password: bcrypt.hashSync(req.body.newPassword, 10),
              };
              log.info("Updating onboard ===== ");
              let result = await Employee.update(
                { employeeId: employeeId },
                updateKey,
              );
              if (result) {
                res
                  .status(200)
                  .json({ message: "Password Updated successfully" });
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
  } catch (err) {
    console.error(err);
  }
};

exports.getChefById = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    // var adminId = req.params.adminId;
    var employeeId = req.params.chefId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await Employee.get({
    kitchenId: kitchenId,
    role: "chef",
    employeeId: employeeId,
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};
exports.getAllChef = async function (req, res, next) {
  if (req.params != null && req.params != undefined) {
    var kitchenId = req.params.kitchenId;
    // var adminId = req.params.adminId;
    // var employeeId = req.params.chefId;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await Employee.get({ kitchenId: kitchenId, role: "chef" });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};
