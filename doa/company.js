var mongoose = require("mongoose");
var companySchema = require("../model/company");

companySchema.statics = {
  create: async function (data) {
    var company = new this(data);
    let result = await company.save();
    return result;
  },
  get: async function (query) {
    let result = await this.find(query, {
      companyId: 1,
      emailId: 1,
      CompanyName: 1,
      contact: 1,
      address: 1,
      city: 1,
      state: 1,
      country: 1,
      pincode: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return result;
  },
  getById: async function (query) {
    let result = await this.findOne(query, {
      companyId: 1,
      emailId: 1,
      CompanyName: 1,
      contact: 1,
      address: 1,
      city: 1,
      state: 1,
      country: 1,
      pincode: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return result;
  },
  update: async function (query, updateData) {
    return await this.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true }
    );
  },

  delete: async function (query) {
    return await this.findOneAndDelete(query);
  },
};

module.exports = mongoose.model("company", companySchema);      