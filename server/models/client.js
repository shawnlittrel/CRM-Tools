
//const workorderSchema = require('./WorkOrder').schema
const { Schema, model } = require("mongoose");

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
    workOrders: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'WorkOrder'
      }
    ],
  },
  
);

const Client = model("Client", clientSchema);

module.exports = Client;

// clients: {
//   {
//   id,
//   name,
//   address,
//   email,
//   phone,
//   workOrders {
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
// }
