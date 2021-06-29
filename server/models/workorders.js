const { Schema, model } = require("mongoose");


workOrders {
    id,
    date,
    description,
    notes [],
    parts [],
    invoice
   
   
   
   
   
   
   
    timeClock {
      dispatched
      arrived
      departed
    }
  }