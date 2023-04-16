import { Router } from 'express'
import { createTodo, getTodos, getTodo, deleteTodo, updateTodo } from '../controllers/todoController'
import Todo from '../models/todoModel'

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