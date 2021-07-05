const { Schema, model } = require("mongoose");

const PartSchema = new Schema({
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

const Part = model("parts", PartSchema);

module.exports = Part;

// Parts {
//   id,
//   name,
//   description,
//   purchasePrice,
//   salePrice,
//   quantityOnHand,
// }
