const { Schema, model } = require("mongoose");

const PartsSchema = new Schem({
  partsName: {
    type: String
  },
  description: {
    type:String,
  },
  
})


// Parts {
//   id,
//   name,
//   description,
//   purchasePrice,
//   salePrice,
//   quantityOnHand,
// }