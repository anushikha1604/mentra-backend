var enquiry = require("../controller/enquiry");
const Joi = require("joi");
var auth = require("../middlewares/validate-token");
const validator = require("express-joi-validation").createValidator({});

const querySchemaCreateOrGetAllEnquiry = Joi.object().keys({
  Name: Joi.string().required(),
  designation: Joi.string().required(),
  emailId: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  brandLogo: Joi.string().required(),
  brandName: Joi.string().required(),
  webSite: Joi.string().required(),
  cr_maroof: Joi.string().required(),
  dishes: Joi.array().items().required(),
  description: Joi.string(),
  city_branches: Joi.string().required(),
  other: Joi.string().required(),
});
const querySchemaGetEnquiry = Joi.object({
  enquiryId: Joi.number().required(),
});

// const querySchemaUpdateOrDeletevendor = Joi.object({
//     vendorId: Joi.number()
// });
const querySchemaExport = Joi.object({
  exportType: Joi.string().required(),
});

module.exports = function (router) {
  router.post(
    "/enquiry",
    validator.body(querySchemaCreateOrGetAllEnquiry),
    enquiry.createEnquiry,
  );
  router.get(
    "/enquiry/:enquiryId",
    validator.params(querySchemaGetEnquiry),
    enquiry.getEnquiryById,
  );
  router.get("/enquiries", enquiry.getEnquiries);
  router.delete("/enquiry/:enquiryId", enquiry.removeEnquiry);
  // router.put('/vendor/:vendorId', [auth.validateJWTToken, auth.isSuperAdmin], vendor.updateVendor);
  router.get(
    "/enquiry/:exportType/export-document",
    validator.params(querySchemaExport),
    enquiry.exportDocument,
  );
  // router.patch('/vendor/:vendorId/publish-status', [auth.validateJWTToken, auth.isSuperAdmin], vendor.updatePublish)
};
