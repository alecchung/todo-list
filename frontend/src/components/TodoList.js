import React, { useState } from 'react'
import axios from 'axios'
import { toast, Flip } from 'react-toastify'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => {
  const [formData, setFormData] = useState({
    name: '',
    completed: false
  })
  const { name } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const createTodo = async (e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error('No todo provided',
        { position: 'top-center', transition: Flip })
    }
    try {
      await axios.post('http://localhost:5000/api/todos', formData)
      toast.success("Todo added.")
      setFormData({ ...formData, name: "" })
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <TodoForm
        name={name}
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
      <hr />
      <Todo />
    </div>
  )
}

export default TodoList