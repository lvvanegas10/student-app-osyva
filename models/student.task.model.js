const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: String,
    score: Number,
    user: String
});

module.exports = mongoose.model('Task', TaskSchema);