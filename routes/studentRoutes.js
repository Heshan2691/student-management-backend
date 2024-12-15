const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = require("../models/Student");

// Add a new student
router.post("/add", async (req, res) => {
  try {
    const { name, email, class: className, schedule } = req.body;

    // Validation
    if (!name || !email || !className) {
      return res
        .status(400)
        .json({ message: "Name, email, and class are required." });
    }

    const newStudent = new Student({
      name,
      email,
      class: className,
      schedule,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, class: className, schedule } = req.body;

    // Validation
    if (!name || !email || !className) {
      return res
        .status(400)
        .json({ message: "Name, email, and class are required." });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, class: className, schedule },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
