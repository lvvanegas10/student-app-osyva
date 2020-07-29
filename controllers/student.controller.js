const Student = require('../models/student.model.js');

// Create and Save a new student
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    const student = new Student({
        fullName: req.body.fullName, 
        studentId: req.body.studentId,
        email: req.body.email,
    });

    // Save student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding the Student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(student => {
        res.send(student);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.studentId
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        fullName: req.body.fullName, 
        studentId: req.body.studentId,
        email: req.body.email
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};