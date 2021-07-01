const { Schema, model } = require("mongoose");
const timeClockSchema = require('./Timeclock')

const WorkordersSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    notes: [],
    parts: [],

    invoice: {
      type: String,
    },
    timeclock: [timeClockSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Workorders = model("Workorders", WorkordersSchema);

module.exports = Workorders;

// workOrders {
//     id,
//     date,
//     description,
//     notes [],
//     parts [],
//     invoice
   
   
  //   timeClock {
  //     dispatched
  //     arrived
  //     departed
  //   }
  // }