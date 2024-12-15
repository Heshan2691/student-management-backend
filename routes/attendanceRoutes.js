const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

// Add attendance record
router.post("/add", async (req, res) => {
  const { studentId, status } = req.body;

  const attendance = new Attendance({
    studentId,
    status,
    date: new Date(),
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get attendance records
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate("studentId", "name email class") // Populate student details
      .exec();
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({
      studentId: req.params.studentId,
    })
      .populate("studentId", "name email class")
      .exec();
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
