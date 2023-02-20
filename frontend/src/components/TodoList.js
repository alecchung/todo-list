import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, Flip } from 'react-toastify'
import { URL } from '../App'
import Todo from './Todo'
import TodoForm from './TodoForm'
import loading from '../assets/loading.gif'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    todo: '',
    completed: false
  })
  const { todo } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getTodos = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${URL}/api/todos`)
      setTodos(data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  // create a todo
  const createTodo = async (e) => {
    e.preventDefault()
    if (todo === "") {
      return toast.error('No todo provided', { position: 'top-center', transition: Flip })
    }
    try {
      console.log(formData);
      await axios.post(`${URL}/api/todos`, formData)
      toast.success("Todo added.", { position: 'top-center', transition: Flip })
      setFormData({ ...formData, todo: "" })
      getTodos()
    } catch (error) {
      toast.error(error.response.data, { position: 'top-center', transition: Flip })
    }
  }

  // delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${URL}/api/todos/${id}`)
      getTodos()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <TodoForm
        todo={todo}
        handleInputChange={handleInputChange}
        createTodo={createTodo}
      />
      <div className='--flex-between --pb'>
        <p>
          <b>Total: </b>
        </p>
        <p>
          <b>Completed: </b>
        </p>
      </div>
      {
        isLoading && (
          <div className='--flex-center'>
            <img src={loading} alt='loading' width={200}></img>
          </div>
        )
      }
      {
        !isLoading && todos.length === 0
          ? (<p className='--py'>You don't have any todos. Maybe add one first.</p>)
          : (<>
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={todo._id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  index={index}
                />
              )
            })}</>)
      }
    </div>
  )
}

export default TodoList