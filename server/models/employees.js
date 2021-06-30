const mongoose =require('mongoose');


const { Schema } = require("mongoose");


const EmployeeSchema = new Schema ({

  employeeName: {
    type:String,
    required: true,
    trim: trim
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    unique: true,
    match: [/.+@.+\..+/]
  },
  phone: {
    type: Number,
     required: true,
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

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee

