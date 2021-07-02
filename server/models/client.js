
const workorderSchema =require('./workorders')
const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
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
    workorders: [workorderSchema],
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
