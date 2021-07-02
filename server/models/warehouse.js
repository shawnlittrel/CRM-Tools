const { Schema, model } = require("mongoose");

const warehouseSchema = new Schema({
  parts: [String],
  Laboritems: [String],
  
});

const warehouse = model("warehouse", warehouseSchema);

module.exports = warehouse;
// warehouse {
// [Parts],
// [LaborItems]
// }
