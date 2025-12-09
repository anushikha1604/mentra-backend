var mongoose = require("mongoose");
const User = require("../model/user"); // <-- this is the model, correct

module.exports = {
  create: async function (data) {
    const user = new User(data);
    return await user.save();
  },

  get: async function (query) {
    return await User.find(query, {
      userId: 1,
      fullName: 1,
      emailId: 1,
      primaryPhone: 1,
      alternatePhone: 1,
      role: 1,
      collageId: 1,
      password: 1,
      city: 1,
      state: 1,
      country: 1,
      pincode: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
  },

  getOne: async function (query) {
    return await User.findOne(query, {
      userId: 1,
      fullName: 1,
      emailId: 1,
      primaryPhone: 1,
      alternatePhone: 1,
      role: 1,
      collageId: 1,
      password: 1,
      city: 1,
      state: 1,
      country: 1,
      pincode: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
  },

  getById: async function (query) {
    return await User.findOne(query, {
      userId: 1,
      fullName: 1,
      emailId: 1,
      primaryPhone: 1,
      alternatePhone: 1,
      role: 1,
      collageId: 1,
      password: 1,
      city: 1,
      state: 1,
      country: 1,
      pincode: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: 1,
      updatedAt: 1,
    });
  },

  update: async function (query, updateData) {
    return await User.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true }
    );
  },

  delete: async function (query) {
    return await User.findOneAndDelete(query);
  },
};
