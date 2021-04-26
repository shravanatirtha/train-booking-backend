const express = require("express");
const router = express.Router();
const {
  createDate,
  createClass,
  createRoute,
  createTrain,
  getDate,
  getClass,
  getStation,
  getJourney,
  home,
} = require("../controllers/auth");
router.get("/", home);
router.post("/getDate", getDate);
router.post("/getJourney", getJourney);
router.post("/getStation", getStation);
router.post("/getClass", getClass);
router.post("/createClass", createClass);
router.post("/createRoute", createRoute);
router.post("/createDate", createDate);
router.post("/createTrain", createTrain);

module.exports = router;
