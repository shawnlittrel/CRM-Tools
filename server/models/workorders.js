// const { Schema, model } = require("mongoose");
// const timeClockSchema = require('./timeclock')

// const workOrdersSchema = new Schema(
//   {
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     description: {
//       type: String,
//     },
//     notes: Array,
//     parts: Array,

//     invoice: {
//       type: String,
//     },
//     timeclock: [timeClockSchema],
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
// );

// const workOrders = model("workOrder", workOrdersSchema);

// module.exports = workOrders;

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