const mongoose = require("mongoose");

const { Schema } = mongoose;

const LaborItemsSchema = new Schema(
    {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
   Rate: {
    type: Number,
    required: true,
   },
)


const Laboritems= mongoose.model('LaborItems', LaborItemsSchema);

module.exports = Laboritems;



// id, name, description, rate;
