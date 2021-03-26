const Train = require("../models/Train");
require("dotenv").config();
//home route
exports.home = async (req, res) => {
  res.send("Train booking app");
};
//create train
exports.createTrain = async (req, res, next) => {
  let { name, from, to } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!from) {
    errors.push({ from: "required" });
  }
  if (!to) {
    errors.push({ to: "required" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  const train = await Train.findOne({ name: name });
  if (train) {
    return res
      .status(422)
      .json({ errors: [{ train: "Train already exists" }] });
  } else {
    const train = new Train({
      name: name,
      from: from,
      to: to,
    });
    train
      .save()
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: err }],
        });
      });
  }
};
//get train
exports.getTrain = (req, res) => {
  let { from, to } = req.body;
  let errors = [];
  if (!from) {
    errors.push({ from: "required" });
  }
  if (!to) {
    errors.push({ to: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  Train.find({ from:from , to: to })
    .then((train) => {
      if (!train) {
        return res.status(400).json({
          error: [{ train: "not found" }],
        });
      } else {
        return res.status(200).json({
          success: true,
          message: train,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: err,
      });
    });
};
