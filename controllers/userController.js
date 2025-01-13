const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new user
const signUpController = (req, res) => {
  //CHECK FOR ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  //if no errors //get data from body
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

// Sign in a user
// async await
const signInController = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    // Get data from body
    const { email, password } = req.body;
    // Find the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password Invalid" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      "processenvJWT_SECRET", // secret key
      { expiresIn: "1h" }
    );
    // Successful sign-in
    res.status(200).json({
      message: "User signed in successfully",
      Name: user.name,
      Email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during sign-in" });
  }
};

module.exports = {
  signUpController,
  signInController,
};
