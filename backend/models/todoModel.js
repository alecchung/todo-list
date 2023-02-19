const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
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

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo