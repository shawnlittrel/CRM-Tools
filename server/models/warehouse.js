const { Schema, model } = require("mongoose");

const warehouseSchema = new Schema({
  parts: Array,
  Laboritems: Array,
  
});

const warehouse = model("warehouse", warehouseSchema);

module.exports = warehouse;
// warehouse {
// [Parts],
// [LaborItems]
// }
