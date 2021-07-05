const { Schema, model } = require("mongoose");

const warehouseSchema = new Schema({
  parts: [String],
  Laboritems: [String],
  
});

const Warehouse = model("warehouse", warehouseSchema);

module.exports = Warehouse;
// warehouse {
// [Parts],
// [LaborItems]
// }
