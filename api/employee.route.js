var employee = require("../controller/employee");
var auth = require("../middlewares/validate-token");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const querySchemaCreateOrGetAllEmployees = Joi.object().keys({
  Name: Joi.string().required(),
  emailId: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  role: Joi.string().required(),
  employeeConfig: Joi.array().items({
    vendorName: Joi.string(),
    menuCategory: Joi.string(),
    menuSubCategory: Joi.string(),
    menuItem: Joi.string(),
    skillsRating: Joi.number(),
  }),
  schedule: {
    sunday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    monday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    tuesday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    wednesday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    thursday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    friday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
    saturday: {
      morningTimeSlotStart: Joi.string(),
      afterNoonTimeSlotStart: Joi.string(),
      eveningTimeSlotStart: Joi.string(),
      nightTimeSlotStart: Joi.string(),
      morningTimeSlotEnd: Joi.string(),
      afterNoonTimeSlotEnd: Joi.string(),
      eveningTimeSlotEnd: Joi.string(),
      nightTimeSlotEnd: Joi.string(),
      morningTimeSlot: Joi.boolean(),
      afterNoonTimeSlot: Joi.boolean(),
      eveningTimeSlot: Joi.boolean(),
      nightTimeSlot: Joi.boolean(),
    },
  },
  accessControl: Joi.array().items({
    order: Joi.string().required(),
    menu: Joi.string().required(),
    settings: Joi.string().required(),
  }),
});

const querySchemaGetEmployee = Joi.object({
  employeeId: Joi.number().required(),
  adminId: Joi.number().required(),
  kitchenId: Joi.number().required(),
});
const querySchemaExport = Joi.object({
  exportType: Joi.string().required(),
  adminId: Joi.number().required(),
  kitchenId: Joi.number().required(),
});

module.exports = function (router) {
  router.post("/:kitchenId/user/:adminId/employee", employee.createEmployee);
  router.get(
    "/:kitchenId/user/:adminId/employees",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    employee.getEmployees,
  );
  router.get("/:kitchenId/user/:role/employeesbyname", employee.getNameByRole);
  router.get(
    "/:kitchenId/user/:adminId/employee/:employeeId",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    validator.params(querySchemaGetEmployee),
    employee.getEmployeeById,
  );
  router.delete(
    "/:emailId/employee/:employeeId/:adminId",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    employee.removeEmployee,
  );
  router.put(
    "/:kitchenId/user/:adminId/employee/:employeeId",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    employee.updateEmployee,
  );
  router.get(
    "/:kitchenId/user/:adminId/employee/:exportType/export-document",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    validator.params(querySchemaExport),
    employee.exportDocument,
  );
  router.patch(
    "/:employeeId/updatepassword",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    employee.updatePassword,
  );
  router.get(
    "/employees/:role/:kitchenId/user/:adminId",
    employee.getEmployeesByRole,
  );
  router.get("/kitchen/:kitchenId/chef/:chefId", employee.getChefById);
  router.get("/kitchen/:kitchenId/chef", employee.getAllChef);
  router.get("/:kitchenId/employee/:employeeId", employee.getAccessControlList);
};
