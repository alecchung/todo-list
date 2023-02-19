import React, { useState } from 'react'
import axios from 'axios'
import { toast, Flip } from 'react-toastify'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => {
  const [formData, setFormData] = useState({
    todo: '',
    completed: false
  })
  const { todo } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(e);
    setFormData({ ...formData, [name]: value })
  }

  const createTodo = async (e) => {
    e.preventDefault()
    if (todo === "") {
      return toast.error('No todo provided', { position: 'top-center', transition: Flip })
    }
    try {
      console.log(formData);
      await axios.post('http://localhost:5000/api/todos', formData)
      toast.success("Todo added.", { position: 'top-center', transition: Flip })
      setFormData({ ...formData, todo: "" })
    } catch (error) {
      toast.error(error.response.data, { position: 'top-center', transition: Flip })
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
      <hr />
      <Todo />
    </div>
  )
}

export default TodoList