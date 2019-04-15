const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
    name: String,
    type: String,
    born: String,
    death: String,
    married: Boolean,
    content: String,
    img: String
  });

  module.exports = mongoose.model('Crime', crimeSchema);