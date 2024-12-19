const mongoose = require("mongoose");

const ConnectTodoAppDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((req, res) => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectTodoAppDB;
