const { Schema, model } = require("mongoose");

const partsSchema = new Schema({
  partsName: {
    type: String,
  },
  description: {
    type: String,
  },
  purchasePrice: {
    type: Number,
  },

});

const parts = model("parts", partsSchema);

module.exports = parts;

// Parts {
//   id,
//   name,
//   description,
//   purchasePrice,
//   salePrice,
//   quantityOnHand,
// }
