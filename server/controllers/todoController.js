const Todo = require("../models/todoModel");

// create a todo
const createTodo = async (req, res) => {
    try {
        const todo = await create(req.body)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// get a single todo
const getTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await findById(id)
        if (!todo) {
            return res.status(404).json(`No todo with id: ${id}.`)
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await findByIdAndUpdate(
            { _id: id }, req.body, { new: true, runValidators: true, }
        )
        if (!todo) {
            return res.status(404).json(`No todo with id: ${id}.`)
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await findByIdAndDelete(id)
        if (!todo) {
            return res.status(404).json(`No todo with id: ${id}.`)
        }
        res.status(200).send('Todo deleted.')
    } catch (error) {

    }
}

export default {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
}