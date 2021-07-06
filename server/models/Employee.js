const { Schema, model } = require("mongoose");

const timeCardSchema = require("./timecard");

const employeesSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/],
    },
    phone: {
      type: String,
      required: true,
    },
    timeCard: [timeCardSchema],
  },
  
);



const Employee = model("employees", employeesSchema);

module.exports = Employee;