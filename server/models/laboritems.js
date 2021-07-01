const { Schema, model } = require('mongoose');

const LaborItemsSchema = new Schema (
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
   {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
)

const laborItems = model("laborItems",LaborItemsSchema );

module.exports = laborItems;




// id, name, description, rate;
