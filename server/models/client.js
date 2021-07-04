
const workorderSchema =require('./workorders').schema
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
    workorders: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Workorder'
      }
    ],
  },
  
);

const client = model("Client", clientSchema);

module.exports = client;

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
//   //   timeClock {
//     dispatched
//     arrived
//     departed
//   }
// }
// }
