const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require("mongoose");

const timeClockSchema =  new Schema ({
  dispatched: {
    type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
  },
  arrived:{
    type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
  },
  departed:{
    type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
  },
},
  {
    toJSON: {
      getters: true
    }
  }
)
      
  
 module.exports = timeClockSchema; 