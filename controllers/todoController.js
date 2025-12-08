import { Todo } from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    if (!req.body.title) {
        return res.status(400).json({ message: "Title required" });
    }
    const todo = new Todo({
      ...req.body,
      user: req.user.userId 
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.userId }, 
      req.body, 
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!deleted) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};