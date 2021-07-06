const { Schema, Types, model } = require("mongoose");
//const timeCardSchema = require("./timecard");
const bcrypt = require('bcrypt');

const timeCardSchema = new Schema(
  {
    // timeStampId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId()
    // },

    timestamp: {
      type: String,
      required: true,
      trim: true
    },
    
    status: {
      type: String,
      trim: true
    }
  }
  
);

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
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    timeCards: [timeCardSchema]
  },

);

//hash password
employeesSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//compare password with hashed password
employeesSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};




const Employee = model("employees", employeesSchema);

module.exports = Employee;
