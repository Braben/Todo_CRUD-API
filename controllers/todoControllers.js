const Todo = require("../models/todo_model");
const { validationResult } = require("express-validator");

const createTodo = async (req, res) => {
  //CHECK FOR ERRORS
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  //if no errors
  //get data from body
  const { title, priority, deadline } = req.body;
  try {
    const result = await Todo.create({
      title,
      priority,
      deadline,
    });
    res.send({
      success: true,
      message: "Todo App Created successfully",
      data: result,
    });
  } catch {
    (err) => {
      console.log(err);
      res.send({
        success: false,
        message: "Failed to create Todo successfully",
        data: result,
      });
    };
  }
};

const retrieveTodos = (req, res) => {
  const { _id } = req.params;
  //check if id is present
  if (_id) {
    Todo.findById(_id)
      //find by id if _id is present
      .then((todo) => {
        res.send({
          success: true,
          message: `Todo with ${_id} retrieved succeessfully`,
          data: todo,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({
          success: false,
          message: `Failed to retrieve todo successfully ${_id}`,
          data: result,
        });
      });
  } else {
    Todo.find()
      .then((todos) => {
        res.send({
          success: true,
          message: "all Todos retrieved successfully",
          data: todos,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({
          success: false,
          message: "Failed to retrieve todos successfully",
          data: result,
        });
      });
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params._id;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.send({
      success: true,
      message: "Todo updated successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Failed to update todo successfully",
      data: result,
    });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params._id;
  try {
    await Todo.findByIdAndDelete(todoId);
    res.send({
      success: true,
      message: "Todo is deleted successfully",
      data: null,
    });
  } catch {
    (err) => {
      console.log(err);
      res.send({
        success: false,
        message: "Failed to delete todo successfully",
        data: null,
      });
    };
  }
};

module.exports = { createTodo, retrieveTodos, updateTodo, deleteTodo };
