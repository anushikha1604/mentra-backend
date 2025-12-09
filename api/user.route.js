var userporfile = require("../controller/user");
var auth = require("../middlewares/validate-token");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const querySchemaCreateOrGetAlluserProfile = Joi.object().keys({
  name: Joi.string().required(),
  emailId: Joi.string().required(),
  details: Joi.string().required(),
  profilePic: Joi.string().required(),
});

const querySchemaUpdateOrDeleteuserProfile = Joi.object({
  userId: Joi.string().required(),
});

const querySchemaExport = Joi.object({
  exportType: Joi.string().required(),
  userId: Joi.number().required(),
  kitchenId: Joi.number().required(),
});

module.exports = function (router) {
  router.get("/user/:userId", userporfile.getUserById);
  router.get("/users", userporfile.getUsers);
  router.post("/createuser", userporfile.createUser);
  router.put("/user/:userId", userporfile.updateUser);
  router.patch("/user/:userId/updatepassword",userporfile.updatePassword);
  router.get("/user/:userId/:exportType/export-document",
    [auth.validateJWTToken, auth.isKitchenAdmin],
    validator.params(querySchemaExport),
    userporfile.exportDocument,
  );
  router.patch(
    "/:kitchenId/user/:userId/resetepassword",
    userporfile.resetPassword,
  );
  router.post("/forgetpassword", userporfile.forgetPassword);
};
