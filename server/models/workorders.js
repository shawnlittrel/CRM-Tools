const { Schema, model } = require("mongoose");
// const timeClockSchema = require('./Timeclock').schema;
// const timeCardSchema = require('./Timecard').schema;
const partSchema = require('./parts');
const timeClockSchema = require('./Timeclock');

const workOrderSchema = new Schema(
  {
    workOrderDate: {
      type: String,
    },
    workOrderDescription: {
      type: String,
    },
    workOrderNotes: [
      { 
        type: String,
      }
    ],
    workOrderParts: [partSchema],
    workOrderInvoice: [
      { 
        //TODO: run a test on Stripe checkout to see what kind of receipt is returned??
        type: String
      }
    ],
    workOrderTimeClock: [timeClockSchema],
  }
);

// _id: ID
//     date: String
//     description: String
//     notes: [String]
//     parts: [String]
//     invoice: String
//     timeClocks: [Int]

//const workorders = model("workOrder", workorderSchema);

module.exports = workOrderSchema;

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