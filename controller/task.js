const model = require('../model/task');
const { Task } = model;



exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({
            status: 'success',
            data: newTask
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }   
}

exports.getAllTasks = async (req, res) => {
    try{
        const data = await Task.find({user: req.body.user});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    } 
}

exports.getTask = async (req, res) => {
    const id = req.params.id;
    try{
        const data = await Task.findOne({_id: id});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.replaceTask = async (req,res) => {
    const id = req.params.id;
    try{
        const data = await Task.findOneAndReplace({_id: id}, req.body, {new: true});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.updataTask = async (req, res) => {
    const id = req.params.id;
    try{
        const data = await Task.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(error){
        res.status(400).json({
            status: 'error',
            error
        })
    }
}

exports.deleteTask = async(req, res) => {
    const id = req.params.id;
    try{    
        const data = await Task.findOneAndDelete({_id: id});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}