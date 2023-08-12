import Todo from '../models/Todo.js';
import asyncWrapper from '../middleware/async-wrapper.js';
import { createCustomError } from '../errors/custom-error.js';

export const getAllTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).json({ todos });
});

export const createTodo = asyncWrapper(async (req, res, next) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({ todo });
});

export const getTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findById(todoID).exec();
  if (!todo) {
    return next(createCustomError(`No task with ID: ${todoID}`, 404));
  }
  res.status(200).json({ todo });
});

export const updateTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findByIdAndUpdate(todoID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(createCustomError(`No task with ID: ${todoID}`, 404));
  }
  res.status(201).json({ todo });
});

export const deleteTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findByIdAndDelete(todoID);
  if (!todo) {
    return next(createCustomError(`No task with ID: ${todoID}`, 404));
  }
  res.status(200).json({ success: true });
});
