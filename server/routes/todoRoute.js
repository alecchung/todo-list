const express = require('express')
const { createTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../controllers/todoController')
const Todo = require('../models/todoModel')

const router = Router()

router.route('/')
    .get(getTodos)
    .post(createTodo)

router.route('/:id')
    .get(getTodo)
    .patch(updateTodo)
    .put(updateTodo)
    .delete(deleteTodo)

export default router