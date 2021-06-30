const mongoose = require("mongoose");
const workorderschema =require('./Workorders')
const { Schema } = require("mongoose");

const ClientSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    adresss: {
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
      type: Number,
      required: true,
    },
    workorders: [workorderschema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Client = mongoose.model("Client", ClientSchema);

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
//   //   timeClock {
//     dispatched
//     arrived
//     departed
//   }
// }
// }
