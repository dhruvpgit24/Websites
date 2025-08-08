import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 'Pending',
        enum:['Pending','Running','Completed','Failed']
    },
}, {timestamps:true})

const TaskModel = mongoose.model('Task',TaskSchema)

export default TaskModel
