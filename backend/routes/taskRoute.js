const express = require('express')
const { createTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../controllers/taskController')
const Todo = require('../models/todoModel')

const router = express.Router()

router.post('/api/todos', createTodo)
router.get('/api/todos', getTodos)
router.get('/api/todos/:id', getTodo)
router.put('/api/todos/:id', updateTodo)
router.delete('/api/todos/:id', deleteTodo)

module.exports = router