const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    report: {
      type: String,
      required: false
    }
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
