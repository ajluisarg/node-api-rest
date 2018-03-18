
const mongoose = require('mongoose'),
  { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  speaker: { type: String, required: true },
  date: Date,

});

module.exports = mongoose.model('Events', EventSchema);
