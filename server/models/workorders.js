const { Schema, model } = require("mongoose");


const Workorders = new Schema ({
  date: {
    type: Date,
    default: Date.now
  },
  


})


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