const { Schema, model } = require("mongoose");
const billableTimeSchema = require('./BillableTime').schema;
//const timeCardSchema = require('./Timecard').schema;
//const noteSchema = require('./Note');




const workorderSchema = new Schema(
  {
    workOrderDate: {
      type: Date,
    },
    workOrderDescription: {
      type: String,
    },
    workOrderNotes: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Note',
        default: []
      }
    ],
    workOrderParts: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Part',
        default: []
      }
    ],
    workOrderInvoice: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        default: []
      }
    ],
    workOrderBillableTime: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'BillableTime',
        default: []
      }
    ],
  },


);

const WorkOrder = model('WorkOrder', workorderSchema);

module.exports = WorkOrder;

// workOrders {
//     id,
//     date,
//     description,
//     notes [],
//     parts [],
//     invoice
   
   
  //   billableTime {
  //     dispatched
  //     arrived
  //     departed
  //   }
  // }

