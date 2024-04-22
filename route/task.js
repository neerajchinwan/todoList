const taskController = require('../controller/task');
const authController = require('../controller/auth')
const express = require('express');
const router = express.Router();

router
    .post('/', authController.protect, taskController.createTask)
    .get('/', authController.protect, taskController.getAllTasks)
    .get('/:id', authController.protect, taskController.getTask)
    .put('/:id', authController.protect, taskController.replaceTask)
    .patch('/:id', authController.protect, taskController.updataTask)
    .delete('/:id', authController.protect, taskController.deleteTask)



exports.router = router;