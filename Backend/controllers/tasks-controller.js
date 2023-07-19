const HttpError = require('../models/http-error');
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const Task = require('../models/task');
const User = require('../models/user');
const mongoose = require('mongoose');

const getTasksByUserId = async (req, res, next) => {
    const userId = req.params.uid; 
    let tasks;
    try{
        tasks = await Task.find({uid: userId});
    }
    catch(err){
        const error = new HttpError('Fetching tasks failed, please try again',500);
        return next(error);
    }
    
  
    if(!tasks || tasks.length === 0){
      return next(new HttpError('Could not find a tasks for provided user id', 404));
    }
    console.log(tasks);
    res.json({tasks:tasks.map(task => task.toObject({getters:true}))});
  }

const getTaskById =async (req, res, next) => {
    const taskId = req.params.tid;
    console.log("taskid in getTaskByI"+taskId);
    let task;
    try{
        task = await Task.findById(taskId);
    }
    catch(err){
        const error = new HttpError('Fetching task failed, please try again', 500);
        return next(error);
    }
    console.log(task);

    if (!task) {
      return next(
        new HttpError("Could not find a task for provided task id", 404)
      );
    }
    console.log(task);
    res.json(task);
}


const createTask = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next( new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const { title, status, uid } = req.body;
    const createdTask = new Task({
        title,
        status,
        uid
    });

    console.log(uid);

    let user;

    try{
        user = await User.findById(uid);
        console.log(user);
    }catch(err){
        const error = new HttpError(
            'Creating task failed, please try again',
            500
        );
        return next(error);
    }

    if(!user){
        const error = new HttpError(
            'Could not find user for provided id',
            404
        );
        return next(error);
    }

    console.log(user);

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTask.save({session: sess});
        user.tasks.push(createdTask);
        await user.save({session: sess, validateModifiedOnly: true});
        await sess.commitTransaction();

    }catch (err){
        const error = new HttpError(
            'Creating task failed, please try again',
            500
        );
        return next(error);
    }
    

    res.status(201).json({task:createdTask})
};

const updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next( new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const {title, status} = req.body;
    const taskId = req.params.tid;

    let task;
    try{
        task = await Task.findById(taskId);
    } catch(err){
        const error = new HttpError('Something went wrong, could not update task', 500);
        return next(error);
    }

    task.title = title;
    task.status = status;

    try{
        await task.save();
    } catch(err){
        const error = new HttpError('Something went wrong, could not update task', 500);
        return next(error);
    }

    res.status(200).json({task: task.toObject({getters: true})});

};

const deleteTask = async (req, res, next) => {
    const taskId = req.params.tid;
    console.log(taskId);
    let task;
    try{
        task = await Task.findById(taskId).populate('uid');
    }catch(err){
        const error = new HttpError('Something went wrong could not delete task', 500);
        return next(error);
    }

    if(!task){
        const error = new HttpError('Could not find task for this id', 404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await task.remove({session: sess});
        task.uid.tasks.pull(task);
        await task.uid.save({session: sess});
        await sess.commitTransaction();
    }catch(err){
        const error = new HttpError('Something went wrong could not delete task', 500);
        return next(error);
    }

    res.status(200).json({message:'Deleted task'})
};

const paginateTask = async (req, res) => {
    const userId = req.params.uid;
    let allTasks;
    try {
      allTasks = await Task.find({ uid: userId });
    } catch (err) {
      const error = new HttpError(
        "Fetching tasks failed, please try again",
        500
      );
      return next(error);
    }

    if (!allTasks || allTasks.length === 0) {
      return next(
        new HttpError("Could not find a tasks for provided user id", 404)
      );
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalTask = allTasks.length;
    results.pageCount = Math.ceil(allTasks.length / limit);

     if (lastIndex < allTasks.length) {
       results.next = {
         page: page + 1,
       };
     }
     if (startIndex > 0) {
       results.prev = {
         page: page - 1,
       };
     }

     results.result = allTasks.slice(startIndex, lastIndex);

     if (!results.result) {
       return next(
         new HttpError("Could not find a tasks for provided user id", 404)
       );
     }
     res.json(results);

}

exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.getTaskById = getTaskById;
exports.paginateTask = paginateTask; 