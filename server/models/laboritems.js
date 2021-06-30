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
   {
    toJSON: {
      getters: true
    }
  }
)






// id, name, description, rate;
