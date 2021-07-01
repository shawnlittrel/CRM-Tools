const { Schema, model } = require("mongoose");

const timeCardSchema = require("./timecard");

const employeesSchema = new Schema(
  {
    employeeName: {
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



const employees = model("employees", employeesSchema);

module.exports = employees;
