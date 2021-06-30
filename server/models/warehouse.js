const { Schema, model } = require("mongoose");

const WarehouseSchema = new Schema({
  parts: [],
  Laboritems: [],
  
});

const Warehouse = model("Warehouse", WarehouseSchema);

module.exports = Warehouse;
// warehouse {
// [Parts],
// [LaborItems]
// }
