const mongoose = require("mongoose");

const { Schema } = mongoose;

const WarehouseSchema = new Schema({
  parts: [],
  Laboritems: [],
});


const Warehouse = mongoose.model("Warehouse", WharehouseSchema);

module.exports = Warehouse;
// warehouse {
// [Parts],
// [LaborItems]
// }
