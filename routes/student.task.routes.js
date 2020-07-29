module.exports = (app) => {
    const studentsTask = require('../controllers/student.task.controller.js');

    app.post('/students/:studentId/tasks', studentsTask.create);

    app.get('/students/:studentId/tasks', studentsTask.findAll);

    app.get('/students/:studentId/tasks/:taskId', studentsTask.findOne);

    app.put('/students/:studentId/tasks/:taskId', studentsTask.update);

    app.delete('/students/:studentId/tasks/:taskId', studentsTask.delete);
}