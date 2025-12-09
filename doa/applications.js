var mongoose = require("mongoose");
var ApplicationSchema = require("../model/applications");

ApplicationSchema.statics = {
  create: async function (data) {
    var application = new this(data);
    let result = await application.save();
    return result;
  },
  get: async function (query) {
    let result = await this.find(query, { _id: 0 });
    return result;
  },
  getOne: async function (query) {
    let result = await this.findOne(query, { _id: 0 });
    return result;
  },
  getById: async function (query) {
    let result = await this.findOne(query, { _id: 0 });
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
  getNextSequence: function () {
    return new Promise((resolve) => {
      return this.findOne()
        .sort([["applicationId", "descending"]])
        .limit(1)
        .exec((err, data) => {
          if (data != null) {
            if (data.applicationId != undefined) {
              return resolve(data.applicationId);
            } else {
              return resolve(0);
            }
          } else return resolve(0);
        });
    });
  },
};

var ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = ApplicationModel;
