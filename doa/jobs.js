var mongoose = require("mongoose");
var JobSchema = require("../model/jobs");

JobSchema.statics = {
  create: async function (data) {
    var job = new this(data);
    let result = await job.save();
    return result;
  },
  get: async function (query) {
    let result = await this.find(query, {
      _id: 0,
      jobId: 1,
      title: 1,
      companyName: 1,
      description: 1,
      requirements: 1,
      salaryRange: 1,
      jobType: 1,
      experienceLevel: 1,
      isActive: 1,
      attachments: 1,
      location: 1,
      applicationLastDate: 1,
      skills: 1,
      postedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return result;
  },
  getOne: async function (query) {
    let result = await this.findOne(query, {
      _id: 0,
      jobId: 1,
      title: 1,
      companyName: 1,
      description: 1,
      requirements: 1,
      salaryRange: 1,
      jobType: 1,
      experienceLevel: 1,
      isActive: 1,
      attachments: 1,
      location: 1,
      applicationLastDate: 1,
      skills: 1,
      postedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return result;
  },
  getById: async function (query) {
    let result = await this.findOne(query, {
      _id: 0,
      jobId: 1,
      title: 1,
      companyName: 1,
      description: 1,
      requirements: 1,
      salaryRange: 1,
      jobType: 1,
      experienceLevel: 1,
      isActive: 1,
      attachments: 1,
      location: 1,
      applicationLastDate: 1,
      skills: 1,
      postedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return result;
  },
  update: async function (query, updateData) {
    let result = await this.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true },
    );
    return result;
  },
  delete: async function (query) {
    let result = await this.findOneAndDelete(query);
    return result;
  },
};

var jobModel = mongoose.model("Jobs", JobSchema);
module.exports = jobModel;
