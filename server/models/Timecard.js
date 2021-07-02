
const { Schema, model } = require("mongoose");



const timeCardSchema = new Schema({
  timecard: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  clockedIn: {
    type: Boolean,
  },
  },  
  
);


module.exports = timeCardSchema

// timecard [
//      {
//        type: clockIn/clockOut
//        timestamp: timestamp
//      ]
// }