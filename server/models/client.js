const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ClientSchema = new Schema({
  
  clientName:{
    type: String,
    required: true
  },
  adresss: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    unique: true
  },
  phone: {
    type: Number
  },
  workorders:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Workorders'
    }
  ]
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

const Client = model ("Client", ClientSchema)

module.exports = Comment;

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