const { Schema, model } = require("mongoose");


const noteSchema = new Schema({
     timestamp: {
          type: Date,
          default: Date.now,
     },
     noteText: {
          type: String,
          required: 'Please enter some text before saving',
          minlength: 1
     },
     author: {
          type: String,
          required: true
     }
});

const Note = model('Note', noteSchema);

module.exports = Note;