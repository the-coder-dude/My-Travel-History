const express = require("express");

const router = express.Router();

const TravelHistory = require("../models/TravelHistory");

router.get("/", async (req, res) => {
  try {
    const entries = await TravelHistory.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // console.log(req.body);
  try {
    const travelHistory = new TravelHistory(req.body);
    const createdEntry = await travelHistory.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
