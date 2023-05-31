const mongoose = require('mongoose');
const { paginate,toJSON } = require("./plugins");

const medicineSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  duration: String,
  copay: Number,
  currency: String,
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' }
});


medicineSchema.plugin(toJSON);
medicineSchema.plugin(paginate);

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;