const express = require('express');


const tasksControllers = require('../controllers/tasks-controller');
const { check } = require('express-validator');

const router = express.Router();

//router.get('/user/:uid', tasksControllers.getTasksByUserId);

router.get("/user/:uid/paginatedtask", tasksControllers.paginateTask);

router.post('/',
[
    check('title')
    .trim()
    .notEmpty()
],
tasksControllers.createTask);

router.patch('/:tid',
[
    check('title')
    .trim()
    .notEmpty()
],
tasksControllers.updateTask);

router.get(
  "/:tid",
  tasksControllers.getTaskById
);

router.delete('/:tid', tasksControllers.deleteTask);

module.exports = router;