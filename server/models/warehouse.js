const { Schema, model } = require("mongoose");


const WarehouseSchema = new Schema({
    
   Parts:{
       parts:[]
    },
    Laboritems:{ 
        laboritems:[]
    }

})


// warehouse {
// [Parts],
// [LaborItems]
// }