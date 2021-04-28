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
router.get("/getDate", getDate);
router.get("/getJourney", getJourney);
router.get("/getStation", getStation);
router.get("/getClass", getClass);
router.post("/createClass", createClass);
router.post("/createRoute", createRoute);
router.post("/createDate", createDate);
router.post("/createTrain", createTrain);

module.exports = router;
