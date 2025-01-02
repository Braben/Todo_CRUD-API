const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
  //hash the password
  bcrypt
    .hash(password, 7)
    .then((hashedPassword) => {
      //save the hashed password
      const user = new userModel({
        name,
        email,
        password: hashedPassword,
      });
      //save the user

      user
        .save()
        //save the user
        .then((user) => {
          //if user is created successfully
          if (user) {
            res.status(201).json({
              message: "User created successfully",
              Name: user.name,
              Email: user.email,
            });
          }
        })
        //if user is not created successfully
        .catch((err) => {
          console.log(err);
          res.json({ message: "User creation failed", data: user });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "User creation failed", data: user });
    });
};

module.exports = {
  signUpController,
};
