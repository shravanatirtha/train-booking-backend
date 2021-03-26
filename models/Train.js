const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    tname: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "trains"
  }
);

module.exports = mongoose.model("Train", userSchema);
