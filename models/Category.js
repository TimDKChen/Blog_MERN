const mongoose = require("mongoose");

const getNowTime = () => {
  const date = new Date();
  return date.toISOString();
};

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  timestamps: {
    type: String,
    default: getNowTime()
  }
});

module.exports = mongoose.model("Category", CategorySchema);