const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  duration: String,
  copay: Number,
  currency: String,
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;