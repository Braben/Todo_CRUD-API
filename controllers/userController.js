const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
// Create a new user
const signUpController = (req, res) => {
  //CHECK FOR ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  //if no errors
  //get data from body
  const { name, email, password } = req.body;
  //create new user
  const user = new userModel({
    name,
    email,
    password,
  });
  //save the user
  user
    .save()
    //save the user
    .then((result) => {
      //if user is created successfully
      if (result) {
        res
          .status(201)
          .json({ message: "User created successfully", data: result });
      } else {
        res.json({ message: "User creation failed", data: result });
      }
    })

    //if user is not created successfully
    .catch((err) => {
      console.log(err);
      res.json({ message: "User creation failed", data: result });
    });
};

module.exports = {
  signUpController,
};
