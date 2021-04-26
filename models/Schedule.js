const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    trainId: {
      type: String,
      required: true,
    },
    setDate: [
      {
        type: Date,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "schedule",
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
