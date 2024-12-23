const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const model = mongoose.model;
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
