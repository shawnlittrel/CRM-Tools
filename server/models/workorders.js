const { Schema, model } = require("mongoose");
const timeClockSchema = require('./Timeclock').schema;
const timeCardSchema = require('./Timecard').schema;


const workorderSchema = new Schema(
  {
    workOrderDate: {
      type: Date,
      default: Date.now,
    },
    workOrderDescription: {
      type: String,
    },
    workOrderNotes: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Note'
      }
    ],
    workOrderParts: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Part'
      }
    ],
    workOrderInvoice: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
      }
    ],
    workOrderTimeClock: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Timeclock'
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// _id: ID
//     date: String
//     description: String
//     notes: [String]
//     parts: [String]
//     invoice: String
//     timeClocks: [Int]

const workorders = model("workOrder", workorderSchema);

module.exports = workorders;

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