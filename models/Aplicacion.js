const mongoose = require('mongoose');

const AplicacionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Aplicacion', AplicacionSchema);
