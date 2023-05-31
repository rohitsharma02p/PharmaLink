const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    report: {
      type: String,
      required: false
    },
    name:{
      type: String,
    },
    pharmacies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Pharmacy"
      }
    ]
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
reportSchema.plugin(toJSON);
reportSchema.plugin(paginate);

/**
 * @typedef Report
 */
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
