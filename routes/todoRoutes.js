const express = require("express");
const Router = express.Router();
const Todo = require("../models/todo_model");
const { body } = require("express-validator");
const {
  retrieveTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

Router.get("/todos/:_id?", retrieveTodos);

const validateTodo = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("title")
    .isLength({ min: 10, max: 99 })
    .withMessage("Title must be between 10 and 99 characters long.")
    .custom(async (title) => {
      const existingTodo = await Todo.findOne({ title });
      if (existingTodo) {
        throw new Error("Todo already exists.");
      }
    }),
  body("priority").trim().notEmpty().withMessage("Priority is required"),
  body("deadline")
    .trim()
    .notEmpty()
    .withMessage("Deadline is required")
    .isDate("yyyy - mm - dd")
    .withMessage("Deadline must be a valid date"),
];

Router.post("/createtodos", validateTodo, createTodo);

Router.patch("/todos/:_id", validateTodo, updateTodo);

Router.delete("/delete/:_id", deleteTodo);

module.exports = Router;
