var Company = require('../controller/company');
var auth = require("../middlewares/validate-token");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const querySchemaCreateOrGetAllCompany = Joi.object().keys({
  companyId: Joi.string().required(),
  emailId: Joi.string().required(),
  CompanyName: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pincode: Joi.string().required(),
});

const querySchemaUpdateOrDeleteCompany = Joi.object({
  companyId: Joi.string().required(),
});

module.exports = function (router) {
  router.post(
    "/createcompany", Company.createCompany
  );
  router.get(
    "/companies", Company.getAllCompanies
  );
  router.get(
    "/company/:id", Company.getCompanyById
  );
  router.put(
    "/company/:id", Company.updateCompany
  );
  router.delete(
    "/company/:id", Company.deleteCompany
  );
};
