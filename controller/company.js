var Company = require('../doa/company');
// var log = require("../logger");
// var emailService = require("./email-sender");
// var datetime = new Date();
// var bcrypt = require("bcrypt");
// var exportDoc = require("./export-documents"); // Commented out - file doesn't exist
// var fs = require("fs");

exports.createCompany = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "request body required" });
    }
    const companyData = req.body;
    const emailId = companyData.emailId;
    if (!emailId) {
      return res.status(400).json({ error: "emailId is required" });
    }

    // Check for duplicate emailId
    let existingCompany = await Company.get({ emailId: emailId });
    if (existingCompany && existingCompany.length > 0) {
      return res.status(400).json({ error: "Company already exists with this emailId" });
    }
    // Generate next companyId
    let lastCompany = await Company.findOne().sort({ companyId: -1 }).lean();
    let nextCompanyId;
    if (lastCompany && lastCompany.companyId) {
      const lastIdNum = parseInt(lastCompany.companyId.replace("COMP", "")) || 0;
      nextCompanyId = "COMP" + (lastIdNum + 1).toString().padStart(3, "0");
    } else {
      nextCompanyId = "COMP001";
    }
    companyData.companyId = nextCompanyId;

    // Create new company
    const newCompany = await Company.create(companyData);
    if (!newCompany) {
      return res.status(500).json({ error: "Failed to create company" });
    }
    return res.status(201).json({ message: "Company created successfully", data: newCompany });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.get({});

    if (!companies || companies.length === 0) {
      return res.status(404).json({ error: "Companies not found" });
    }

    return res.status(200).json({ data: companies });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getCompanies = async function (req, res, next) {
  let result = await Company.get({});
  if (result) {
    res.status(200).json({ Company: result });
  } else {
    res.status(500).json({ error: "No data found" });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.getById({ companyId: req.params.id });
    if (!company) return res.status(404).json({ error: "company not found" });
    return res.status(200).json({ data: company });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const updates = req.body;
    // Check for duplicate emailId
    let existingCompany = await Company.get({ emailId: updates.emailId });
    if (existingCompany && existingCompany.length > 0 && existingCompany[0].companyId !== req.params.id) {
      return res.status(400).json({ error: "Company already exists with this emailId" });
    }
    const company = await Company.update({ companyId: req.params.id }, updates);
    if (!company) return res.status(404).json({ error: "company not found" });
    return res.status(200).json({ message: "company updated successfully", data: company });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.delete({ companyId: req.params.id });
    if (!company) return res.status(404).json({ error: "company not found" });
    return res.status(200).json({ message: "company deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};  