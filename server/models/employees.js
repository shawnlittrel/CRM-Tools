const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const EmployeeSchema = new Schema ({

  employeeName: {
    type:String,
    required: true,
    trim: trim
  },
  adresss: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    unique: true
  },
  phone: {
    type: Number
  },
},
   {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

const Employee = model('Employee', EmployeeSchema)

module.exports = Employee

