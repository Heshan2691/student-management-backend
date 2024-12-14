const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  schedule: [
    {
      day: String,
      time: String,
      subjects: String,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
