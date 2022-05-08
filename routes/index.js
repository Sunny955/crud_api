const express = require("express");
const router = express.Router();

const { Employee } = require("../models/employee");

// Get all employees
router.get("/api/employees", (req, res) => {
  Employee.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.json({
        error: err,
      });
    }
  });
});

// Save employees
router.post("/api/employee/add", (req, res) => {
  const { name, email, salary } = req.body;
  if (name && email && salary) {
    const emp = new Employee({
      name,
      email,
      salary,
    });
    emp.save((err, data) => {
      res.status(200).json({
        code: 200,
        message: "Added new employee successfully!",
        employee: data,
      });
    });
  } else {
    res.status(400).json({ error: "No payload data or wrong data provided" });
  }
});

// Get single employee
router.get("/api/employee/:id", (req, res) => {
  if (req.params.id.length < 24) {
    res.json({
      error: "Invalid ID",
    });
  }
  Employee.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.json({
        error: err,
      });
    }
  });
});

// Update employee
router.put("/api/employee/edit/:id", (req, res) => {
  const emp = {
    name: req.body.name,
    email: req.body.email,
    salary: req.body.email,
  };
  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Employee updated successfully",
          updateEmployee: data,
        });
      } else {
        res.json({ error: err });
      }
    }
  );
});

//Delete employee
router.delete("/api/employee/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: "Employee deleted successfully!",
        deleteEmployee: data,
      });
    } else {
      res.json({ error: err });
    }
  });
});

module.exports = router;
