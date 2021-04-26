const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const routeSchema = mongoose.Schema(
  {
    trainId: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    stations: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "route",
  }
);

module.exports = mongoose.model("Route", routeSchema);
