// src/controllers/taskController.js
const Task = require('../models/Task');
const taskValidation = require('../validation/taskValidation');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { error } = taskValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = new Task({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// Get all tasks with filters and pagination
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sort = 'createdAt', order = 'asc', page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving task', error: err.message });
  }
};

// Update a specific task by ID
exports.updateTask = async (req, res) => {
  try {
    const { error } = taskValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updatedAt: new Date(),
    }, { new: true });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// Delete a specific task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};
