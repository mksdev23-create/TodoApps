const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,      // ✅ fixed: 'required', not 'require'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);