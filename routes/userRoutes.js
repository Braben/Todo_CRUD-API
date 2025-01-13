const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const {
  signUpController,
  signInController,
} = require("../controllers/userController");
const { body } = require("express-validator");

// Validate user input
const validateUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is required")
    // Check if email already exists
    .custom(async (email) => {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        throw new Error("Email already exists.");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is required and must be at least 6 characters long"),
];

// Validate user input
const validateUsersignin = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is required and must be at least 6 characters long"),
];

// Create a new user
router.put("/signup", validateUser, signUpController);
router.post("/signin", validateUsersignin, signInController);
module.exports = router;
