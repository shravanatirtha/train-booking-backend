const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
const PORT = 8000;
//express server
app.listen(PORT, () => {
  console.log(`Om namo narayanaya http://localhost:${PORT}`);
});
const authroutes = require("./routes/auth");
app.use("/api", authroutes);
//db server
mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async (err) => {
    if (err) {
      console.error(err);
    }
  }
);
//Database connection
let connection = mongoose.connection;
connection.on("connected", async () => {
  console.log("Db connected");
});
