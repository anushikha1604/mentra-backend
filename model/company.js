/*
The code defines the schema for employee object.
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = new Schema(
  {
    companyId: {
      type: String,
      unquie: true,
      required: true,
      index: true,
    },
    CompanyName: {
      type: String,
      unique: false,
      index: false,
    },

    emailId: {
      type: String,
      unique: false,
      index: false,
    },
    contact: {
      type: String,
      unique: false,
      index: false,
    },
    address: {
      type: String,
      unique: false,
      index: false,
    },
    city: {
      type: String,
      unique: false,
      index: false,
    },
    state: {
      type: String,
      unique: false,
      index: false,
    },
    country: {
      type: String,
      unique: false,
      index: false,
    },
    pincode: {
      type: String,
      unique: false,
      index: false,
    },  
    
  },
  {
    timestamps: true,
  },
);
module.exports = employeeSchema;
