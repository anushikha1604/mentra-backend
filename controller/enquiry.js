var enquiry = require("../doa/enquiry");
var log = require("../logger");
// var exportDoc = require("./export-documents"); // Commented out - file doesn't exist
var fs = require("fs");
var emailService = require("./email-sender");
var datetime = new Date();

exports.createEnquiry = async function (req, res, next) {
  try {
    if (req.body !== undefined && req.body !== null) {
      let data = await enquiry.getOne({ emailId: req.body.emailId });
      if (data) {
        res
          .status(500)
          .json({
            error:
              "enquiry with this email  already exist. Team will get back to you soon!",
          });
      } else {
        var Id = await getNextSequence();
        var enquiryObject = {
          Name: req.body.Name,
          enquiryId: parseInt(Id) + 1,
          emailId: req.body.emailId,
          mobileNumber: req.body.mobileNumber,
          brandName: req.body.brandName,
          brandLogo: req.body.brandLogo,
          webSite: req.body.webSite,
          cr_maroof: req.body.cr_maroof,
          designation: req.body.designation,
          dishes: req.body.dishes,
          description: req.body.description,
          city_branches: req.body.city_branches,
          other: req.body.other,
        };
        let result = await enquiry.create(enquiryObject);
        if (result) {
          let obj = {
            type: "enquiry",
          };
          let serviceRes = emailService.sendEmailNew(
            enquiryObject.emailId,
            "Welcome User",
            obj,
          );
          log.info("generating user ===== " + "success");
          log.info("email service response === " + serviceRes);
          res.status(200).json({ message: "enquiry created successfully" });
        } else {
          res.status(500).json({ error: "can't create enquiry" });
        }
      }
    } else {
      res.status(400).json({ error: "required request body" });
    }
  } catch (e) {
    console.error(e);
  }
};

function getNextSequence() {
  return new Promise((resolve) => {
    return enquiry
      .findOne()
      .sort([["enquiryId", "descending"]])
      .limit(1)
      .exec((err, data) => {
        if (data != null) {
          if (data.enquiryId != undefined) {
            return resolve(data.enquiryId);
          } else {
            return resolve(0);
          }
        } else return resolve(0);
      });
  });
}

//get all enquiry
exports.getEnquiries = async function (req, res, next) {
  let result = await enquiry.get();
  if (result) {
    res.status(200).json({ items: result });
  } else {
    res.status(400).json({ error: "data not found" });
  }
};

// vendor getby vendorId etails
exports.getEnquiryById = async function (req, res, next) {
  if (req.params.enquiryId != null && req.params.enquiryId != undefined) {
    var enquiryId = parseInt(req.params.enquiryId);
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let result = await enquiry.getById({ enquiryId: enquiryId });
  if (result) {
    res.status(200).json({ vendor: result });
  } else {
    res.status(400).json({ error: "Id not found" });
  }
};

// update vendor detail
// exports.updateEnquiry = async function(req, res, next) {
//     if (req.params.enquiryId != null && req.params.enquiryId != undefined) {
//         var enquiryId = parseInt(req.params.enquiryId);
//     } else {
//         res.status(400).json({ error: "request parameters required" });
//     }
//     let enquiryData = await enquiry.getOne({ enquiryId: req.params.enquiryId });
//     if (enquiryData) {
//         if (req.body !== null && req.body !== undefined) {
//             var newEnquiry = {
//                 vendorLogo: req.body.vendorLogo,
//                 licenseKey: req.body.licenseKey,
//                 webHookUrl: req.body.webHookUrl,
//             }
//             log.info("Updating vendor =====> ");
//             let result = await vendor.update({ "vendorId": vendorId }, newVendor);
//             if (result) {
//                 log.info(datetime + " === " + result);
//                 res.status(200).json({ message: "vendor updated successfully" });
//             } else {
//                 log.error(datetime + " === " + result);
//                 res.status(500).json({ error: "can't update vendor" });
//             }
//         } else {
//             res.status(400).json({ error: "request body required" });
//         }
//     } else {
//         res.status(400).json({ error: "vendor data not found" });
//     }
// }

//remove vendor
exports.removeEnquiry = async function (req, res) {
  if (req.params.enquiryId != null && req.params.enquiryId != undefined) {
    var enquiryId = parseInt(req.params.enquiryId);
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  let enquiryData = await enquiry.getOne({ enquiryId: enquiryId });
  if (enquiryData) {
    let result = await enquiry.delete({ enquiryId: enquiryId });
    log.info("Vendor deletion started !");
    if (result) {
      res.status(200).json({ message: "Enquiry deleted successfully" });
    } else {
      res.status(500).json({ error: "can't delete enquiry" });
    }
  } else {
    res
      .status(400)
      .json({ error: "enquiry with this enquiryId does not exist!" });
  }
};

exports.exportDocument = async (req, res, next) => {
  if (req.params != null && req.params != undefined) {
    var exportType = req.params.exportType;
  } else {
    res.status(400).json({ error: "request parameters required" });
  }
  try {
    let result = await enquiry.get();
    var filePath;
    const fileName = "enquiry";
    const fields = [
      "Name",
      "emailId",
      "mobileNumber",
      "website",
      "brandName",
      "cr_maroof",
      "designation",
      "dishes",
      "description",
      "city_branches",
      "culin_services",
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
      filePath = await exportDoc.getCSV(result, fields, fileName);
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
      filePath = await exportDoc.getPdf(result, fileName, "enquiry");
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

// exports.updatePublish = async function(req, res, next) {
//     if (req.params.vendorId != null && req.params.vendorId != undefined) {
//         var vendorId = parseInt(req.params.vendorId);
//     } else {
//         res.status(400).json({ error: "request parameters required" });
//     }
//     log.info("updating publish===== ");
//     let vendorData = await vendor.getOne({ vendorId: vendorId });
//     if (vendorData) {
//         if (req.body !== null && req.body !== undefined) {
//             var updatePublishObject = {};
//             updatePublishObject.publish = req.body.publish;
//             let result = await vendor.update({ vendorId: vendorId }, updatePublishObject);
//             if (result) {
//                 log.info(datetime + " === " + "success");
//                 res.status(200).json({ message: "Vendor Publish Updated successfully" });
//             } else {
//                 log.error(datetime + " === " + "failure");
//                 res.status(500).json({ error: "can't update Publish" });
//             }
//         } else {
//             res.status(400).json({ error: "request body required" });
//         }
//     } else {
//         res.status(400).json({ error: "vendor data not found" })
//     }
// }
