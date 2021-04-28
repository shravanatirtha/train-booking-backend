const Train = require("../models/Train");
const Route = require("../models/Route");
const Classes = require("../models/Classes");
const Schedule = require("../models/Schedule");
require("dotenv").config();
//home route
exports.home = async (req, res) => {
  res.send("Train booking app");
};
//create train
exports.createTrain = async (req, res, next) => {
  try {
    let { trainId, trainName, quota } = req.body;
    let errors = [];
    if (!trainId) {
      errors.push({ trainId: "required" });
    }
    if (!trainName) {
      errors.push({ trainName: "required" });
    }
    if (!quota) {
      errors.push({ quota: "required" });
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const train = await Train.findOne({ trainId: trainId });

    if (train) {
      return res
        .status(422)
        .json({ errors: [{ train: "Train already exists" }] });
    } else {
      const train = new Train({
        trainId: trainId,
        trainName: trainName,
        quota: quota,
      });
      train.save(function (err, response) {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//create route
exports.createRoute = async (req, res, next) => {
  try {
    let { trainId, source, destination, stations } = req.body;
    let errors = [];
    if (!trainId) {
      errors.push({ trainId: "required" });
    }
    if (!source) {
      errors.push({ source: "required" });
    }
    if (!destination) {
      errors.push({ destination: "required" });
    }
    if (!stations) {
      errors.push({ stations: "required" });
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const route = await Route.findOne({ trainId: trainId });
    if (route) {
      return res
        .status(422)
        .json({ errors: [{ route: "Train already exists" }] });
    } else {
      const route = new Route({
        trainId: trainId,
        source: source,
        destination: destination,
        stations: stations,
      });
      route.save(function (err, response) {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//create class
exports.createClass = async (req, res, next) => {
  try {
    let { trainId, classDetails } = req.body;
    let errors = [];
    if (!trainId) {
      errors.push({ trainId: "required" });
    }
    if (!classDetails) {
      errors.push({ classDetails: "required" });
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const classes = await Classes.findOne({ trainId: trainId });
    if (classes) {
      return res
        .status(422)
        .json({ errors: [{ classes: "Train already exists" }] });
    } else {
      const classes = new Classes({
        trainId: trainId,
        classDetails: classDetails,
      });
      classes.save(function (err, response) {
        res.status(200).json({
          success: true,
          message: classes,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//create schedule
exports.createDate = async (req, res, next) => {
  try {
    let { trainId, setDate } = req.body;
    let errors = [];
    if (!trainId) {
      errors.push({ trainId: "required" });
    }
    if (!setDate) {
      errors.push({ setDate: "required" });
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const dates = await Schedule.findOne({ trainId: trainId });
    if (dates) {
      return res
        .status(422)
        .json({ errors: [{ dates: "Train already exists" }] });
    } else {
      const dates = new Schedule({
        trainId: trainId,
        setDate: setDate,
      });
      dates.save(function (err, response) {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//get journey
exports.getJourney = async (req, res) => {
  try {
    let { source, destination } = req.body;
    let errors = [];
    if (!source) {
      errors.push({ source: "required" });
    }
    if (!destination) {
      errors.push({ destination: "required" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const details = await Route.find({
      stations: [source, destination],
    });

    if (!details.length) {
      return res.status(400).json({
        error: [{ details: "not found" }],
      });
    }
    return res.status(200).json({
      success: true,
      message: details,
    });
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};
//get station details
exports.getStation = async (req, res) => {
  try {
    let { source, destination } = req.query;
    let errors = [];
    if (!source) {
      errors.push({ source: "required" });
    }
    if (!destination) {
      errors.push({ destination: "required" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    const details = await Route.find({
      stations: source,
      stations: destination,
    });

    if (!details.length) {
      return res.status(400).json({
        error: [{ details: "not found" }],
      });
    }
    return res.status(200).json({
      success: true,
      message: ["Journey from:", source, "Journey to:", destination, details],
    });
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//get class details
exports.getClass = async (req, res) => {
  try {
    let { fair } = req.query;
    let errors = [];
    if (!fair) {
      errors.push({ fair: "required" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    const details = await Classes.find({
      "classDetails.fair": fair,
    });

    if (!details.length) {
      return res.status(400).json({
        error: [{ details: "not found" }],
      });
    }
    return res.status(200).json({
      success: true,
      message: details,
    });
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};

//get schedule
exports.getDate = async (req, res) => {
  try {
    let { searchDate } = req.query;
    let errors = [];
    if (!searchDate) {
      errors.push({ searchDate: "required" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    const details = await Schedule.find({
      setDate: searchDate,
    });

    if (!details.length) {
      return res.status(400).json({
        error: [{ details: "not found" }],
      });
    }
    return res.status(200).json({
      success: true,
      message: details,
    });
  } catch (err) {
    res.status(500).json({
      errors: [{ error: err }],
    });
  }
};
