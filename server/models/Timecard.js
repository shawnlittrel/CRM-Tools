
const { Schema, model } = require("mongoose");



const timecardSchema = new Schema({
  timecard: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  clockedIn: {
    type: Boolean,
  },
  },  
  {
    toJSON: {
      getters: true
    }
  }
);


module.exports = timeCardSchema

// timecard [
//      {
//        type: clockIn/clockOut
//        timestamp: timestamp
//      ]
// }