const mongoose = require('mongoose')

const todoSchema = Schema({
    todo: {
        type: String,
        required: [true, "Please add a todo: "],
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        timestamps: true,
    })

const Todo = model('Todo', todoSchema)

export default Todo