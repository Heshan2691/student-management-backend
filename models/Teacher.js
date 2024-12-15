const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  schedule: [
    {
      day: String,
      time: String,
      class: String,
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
