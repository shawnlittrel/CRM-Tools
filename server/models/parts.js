const { Schema, model } = require("mongoose");

const partsSchema = new Schema({
  partProductName: {
    type: String,
  },
  partProductDescription: {
    type: String,
  },
  partPrice: {
    type: String,
  },

});

//const parts = model("parts", partsSchema);

module.exports = partsSchema;

// Parts {
//   id,
//   name,
//   description,
//   purchasePrice,
//   salePrice,
//   quantityOnHand,
// }
