const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let trainSchema = new Schema(
  {
    trainId: {
      type: String,
      required: true,
    },
    trainName: {
      type: String,
      required: true,
    },
    quota:[
      {
        type:String,
        required:true
      }
    ]
  },
  {
    timestamps: true,
    collection: "train",
  }
);

module.exports = mongoose.model("Train", trainSchema);
