const { Schema, model } = require("mongoose");

const timeCardSchema = require("./Timecard");

const EmployeesSchema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: trim,
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
      type: Number,
      required: true,
    },
    timeCard: [timeCardSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);



const Employees = model("Employees", EmployeesSchema);

module.exports = Employees;
