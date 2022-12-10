let express = require("express");
let db = require("../models"); // Will automatically search here for an 'index' file
const student = require("../models/student");
let Student = db.Student;

let router = express.Router();

router.get("/students", function (req, res, next) {
  // Runs this function when we make a GET request at '/students'

  Student.findAll({ order: ["present", "starID"] })
    .then((students) => {
      return res.json(students);
    })
    .catch((err) => next(err));
});

router.post("/students", function (req, res, next) {
  Student.create(req.body)
    .then((data) => {
      // Data always needs to be packaged with this call since req.data is data sent with request

      return res.status(201).send("ok"); // Many different error codes and 2XX codes usually means success. Code 201 is convention for when something is created
    })
    .catch((err) => {
      if (err instanceof db.sequelize.Sequelize.ValidationError) {
        // For if it fails the database's validation
        // respond with 400 (Bad Request) error code
        let messages = err.errors.map((e) => e.message);
        return res.status(400).json(messages);
      }

      // Otherwise, something unexpected has gone wrong
      return next(err); // passes off dealing with the error to /api
    });
});

// ToDo: Edit a student
router.patch("/students/:id", function (req, res, next) {
  // ':id' is being used as a variable, and whatever gets entered there will
  // studentID will equate to it

  let studentID = req.params.id;
  let updatedStudent = req.body;
  Student.update(updatedStudent, { where: { id: studentID } })
    .then((rowsModified) => {
      // Overwrites the whole index but it may not be noticible with small changes

      let numberOfRowsModified = rowsModified[0];

      if (numberOfRowsModified == 1) {
        return res.send("ok");
      } else {
        return res.status(404).json(["Student with that ID not found"]);
      }
    })
    .catch((err) => {
      if (err instanceof db.sequelize.Sequelize.ValidationError) {
        let messages = err.errors.map((e) => e.messages);
        return res.status(400).json(messages);
      } else {
        return next(err);
      }
    });
});

// ToDo: Delete a student
router.delete("/students/:id", function (req, res, next) {
  let studentID = req.params.id;
  Student.destroy({ where: { id: studentID } })
    .then((rowsDeleted) => {
      if (rowsDeleted == 1) {
        return res.send("Deleted:)");
      } else {
        return res.status(404).json(["Not Found"]);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
