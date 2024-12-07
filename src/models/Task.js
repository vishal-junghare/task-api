// src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
    default: 'TODO',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true, // Automatically sets createdAt and updatedAt
});

module.exports = mongoose.model('Task', taskSchema);
