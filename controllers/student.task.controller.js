const Task = require('../models/student.task.model.js');
const Student = require('../models/student.model.js');

// Create and Save a new task to the student with id
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    var _callback = function(req){
        const task = new Task({
            name: req.body.name, 
            score: req.body.score,
            user: req.params.studentId
        });
    
        // Save task in the database
        task.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding the Task."
            });
        });
    }

    findStudentById(req, res, _callback);
};

// Retrieve and return all task from a student.
exports.findAll = (req, res) => {
    var _callback = function(req){
        Task.find({ user: req.params.studentId }, "name score")
        .then(task => {
            res.send(task);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
    }

    findStudentById(req, res, _callback);
};

// Find a single task form an student with an taskId
exports.findOne = (req, res) => {
    var _callback = function(req){
        Task.findOne({ _id: req.params.taskId , user: req.params.studentId }, "name score")
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "User has not Task with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
    }

    findStudentById(req, res, _callback);
};

// Update a task identified by task Id that belongs to the student with studentId
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    var _callback = function(req){
        Task.findOneAndUpdate({ _id: req.params.taskId , user: req.params.studentId }, {
                name: req.body.name, 
                score: req.body.score,
                user: req.params.studentId
            }, {new: true})
            .then(task => {
                if(!task) {
                    return res.status(404).send({
                        message: "User has not Task with id " + req.params.taskId
                    });
                }
                res.send(task);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + req.params.taskId
                    });                
                }
                return res.status(500).send({
                    message: "Error updating task with id " + req.params.taskId
                });
        });
    }

    findStudentById(req, res, _callback);
};

// Delete a task with the specified tasktId in the request
exports.delete = (req, res) => {
    var _callback = function(req){        
        Task.findOneAndRemove({ _id: req.params.taskId , user: req.params.studentId })
            .then(task => {
                if(!task) {
                    return res.status(404).send({
                        message: "User has not Task with id " + req.params.taskId
                    });
                }
                res.send(task);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + req.params.taskId
                    });                
                }
                return res.status(500).send({
                    message: "Error updating task with id " + req.params.taskId
                });
        });
    }

    findStudentById(req, res, _callback);
};

function findStudentById(req, res, callback) {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        callback(req);
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
