const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    },
  ],
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
