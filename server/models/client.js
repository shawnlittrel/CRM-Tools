
//const workorderSchema = require('./WorkOrder')
const { Schema, model } = require("mongoose");

const workOrderSchema = new Schema(
  {
    workOrderClient: {
      type: String
    },
    workOrderDate: {
      type: Date,
    },
    workOrderDescription: {
      type: String,
    },
    // workOrderNotes: [
    //   { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Note',
    //     default: []
    //   }
    // ],
    // workOrderParts: [
    //   { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Part',
    //     default: []
    //   }
    // ],
    // workOrderInvoice: [
    //   { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Invoice',
    //     default: []
    //   }
    // ],
    // workOrderBillableTime: [
    //   { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'BillableTime',
    //     default: []
    //   }
  },


);

const clientSchema = new Schema(
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
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    phone: {
      type: String,
      required: true,
    },

    workOrders: [workOrderSchema]
  },
  
);


const Client = model("Client", clientSchema);

module.exports = Client;
