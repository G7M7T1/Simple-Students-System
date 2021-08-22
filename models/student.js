const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [5, "You can't enter the name more than 5"],
  },
  age: {
    type: Number,
    default: 18,
    max: [120, "No way to that old"],
  },
  scholarship: {
    merit: {
      type: Number,
      default: 0,
      min: 0,
      max: [5000, "Can't more than 5000$"],
    },
    other: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;