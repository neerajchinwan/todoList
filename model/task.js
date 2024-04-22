const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required field'],
        unique: true
    },
    user: String,
    description: {
        type: String,
        required: [true, 'Description is required field']
    },
    status: {
        type: String,
        required: [true, 'Status is required field']
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    finishedBy: {
        type: Date,
        required: [true, 'FinishedBy is required field']
    }
})

exports.Task = mongoose.model('Task', taskSchema);