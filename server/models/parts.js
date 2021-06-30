const { Schema, model } = require("mongoose");

const PartsSchema = new Schem({
  partsName: {
    type: String,
  },
  description: {
    type: String,
  },
  purchasePrice: {
    type: Number,
  },

  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

const Parts = model("Parts", PartsSchema);

module.exports = Parts;

// Parts {
//   id,
//   name,
//   description,
//   purchasePrice,
//   salePrice,
//   quantityOnHand,
// }
