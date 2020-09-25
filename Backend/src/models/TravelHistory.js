const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredDate = {
  type: Date,
  required: true,
};

const travelHistorySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: requiredDate,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TravelHistory", travelHistorySchema);
