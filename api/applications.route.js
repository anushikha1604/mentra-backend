var applicationsController = require("../controller/applications");
const Joi = require("joi");
var auth = require("../middlewares/validate-token");
const validator = require("express-joi-validation").createValidator({});

const createApplicationSchema = Joi.object().keys({
  jobId: Joi.number().required(),
  studentId: Joi.number().required(),
  resumeUrl: Joi.string().required(),
  coverLetter: Joi.string().optional(),
  attachments: Joi.array().items(Joi.string()).optional(),
});

const updateApplicationStatusSchema = Joi.object().keys({
  status: Joi.string()
    .valid("applied", "shortlisted", "rejected", "offered", "accepted")
    .required(),
  feedback: Joi.string().optional(),
});

module.exports = function (router) {
  // Get all applications (filtered by role)
  router.get("/applications", [auth.validateJWTToken], applicationsController.getApplications);

  // Get single application by ID
  router.get(
    "/applications/:applicationId",
    [auth.validateJWTToken],
    applicationsController.getApplicationById,
  );

  // Create application
  router.post(
    "/applications",
    [auth.validateJWTToken],
    validator.body(createApplicationSchema),
    applicationsController.createApplication,
  );

  // Update application status (employer/admin)
  router.patch(
    "/applications/:applicationId/status",
    [auth.validateJWTToken],
    validator.body(updateApplicationStatusSchema),
    applicationsController.updateApplicationStatus,
  );

  // Withdraw application (student owner only)
  router.delete(
    "/applications/:applicationId/withdraw",
    [auth.validateJWTToken],
    applicationsController.withdrawApplication,
  );

  // Delete application (admin only)
  router.delete(
    "/applications/:applicationId",
    [auth.validateJWTToken],
    applicationsController.deleteApplication,
  );
};
