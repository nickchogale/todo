const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{ type: String, required: true},
    status:{ type: String, required: true},
    uid:{ type: mongoose.Types.ObjectId, required: true, ref:'User'}
})

module.exports = mongoose.model('Task', taskSchema);