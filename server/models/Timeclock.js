const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require("mongoose");

const timeClockSchema =  new Schema ({
  dispatched: {
    type: Date,
      default: Date.now, 
  },
  arrived:{
    type: Date,
      default: Date.now, 
  },
  departed:{
    type: Date,
      default: Date.now,
  },
},
 
)
      
  
 module.exports = timeClockSchema; 