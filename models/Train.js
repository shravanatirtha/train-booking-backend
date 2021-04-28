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
 );

module.exports = mongoose.model("Train", trainSchema);
