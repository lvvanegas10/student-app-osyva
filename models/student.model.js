const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
      },
    studentId: {
        type: Number,
        required: true
      },
    email: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Student', StudentSchema);