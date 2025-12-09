var jobsController = require("../controller/jobs");
const Joi = require("joi");
var auth = require("../middlewares/validate-token");
const validator = require("express-joi-validation").createValidator({});

const jobCreateSchema = Joi.object().keys({
  title: Joi.string().required(),
  company: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  employmentType: Joi.string().optional(),
  salary: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
    currency: Joi.string().optional(),
  }).optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  attachments: Joi.array().items(Joi.string()).optional(),
});

const jobUpdateSchema = Joi.object().keys({
  title: Joi.string().optional(),
  company: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  employmentType: Joi.string().optional(),
  salary: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
    currency: Joi.string().optional(),
  }).optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  attachments: Joi.array().items(Joi.string()).optional(),
  publish: Joi.boolean().optional(),
});

const applySchema = Joi.object().keys({
  studentId: Joi.number().required(),
  resumeUrl: Joi.string().required(),
  coverLetter: Joi.string().optional(),
  attachments: Joi.array().items(Joi.string()).optional(),
});

module.exports = function (router) {
  router.post(
    "/jobs",
    [auth.validateJWTToken],
    validator.body(jobCreateSchema),
    jobsController.createJob,
  );

  router.get("/jobs", jobsController.getJobs);

  router.get("/jobs/:jobId", jobsController.getJobById);

  router.put(
    "/jobs/:jobId",
    [auth.validateJWTToken],
    validator.body(jobUpdateSchema),
    jobsController.updateJob,
  );

  router.delete(
    "/jobs/:jobId",
    [auth.validateJWTToken],
    jobsController.removeJob,
  );

  router.post(
    "/jobs/:jobId/apply",
    [auth.validateJWTToken],
    validator.body(applySchema),
    jobsController.applyToJob,
  );
};
