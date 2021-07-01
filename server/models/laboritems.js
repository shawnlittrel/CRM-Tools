const { Schema, model } = require('mongoose');

const laborItemsSchema = new Schema (
    {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
   Rate: {
    type: Number,
    required: true,
   },
  },
   
)

const laborItems = model("laborItems",laborItemsSchema );

module.exports = laborItems;




// id, name, description, rate;
