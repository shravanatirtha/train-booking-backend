const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    trainId: {
      type: String,
      required: true,
    },
    classDetails: [
      {
        className: {
          type: String,
          required: true,
        },
        fair: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "classes",
  }
);

module.exports = mongoose.model("Classes", classSchema);
