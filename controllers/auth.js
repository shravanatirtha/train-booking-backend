const Train = require("../models/Train");
const { createJWT } = require("../utils/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.home = async (req, res) => {
  res.send("Train booking app");
};
exports.createTrain = async (req, res, next) => {
  let { tname, from, to } = req.body;
  let errors = [];
  if (!tname) {
    errors.push({ tname: "required" });
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

  const train = await Train.findOne({ tname: tname });

  if (train) {
    return res
      .status(422)
      .json({ errors: [{ train: "Train already exists" }] });
  } else {
    const train = new Train({
      tname: tname,
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
  Train
    .findOne({ to: to })
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
