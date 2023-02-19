import React from 'react'

const TodoForm = ({ createTodo, name, handleInputChange }) => {
  return (
    <div>
    <form className="todo-form" onSubmit={createTodo}>
      <input
        type='text'
        placeholder='Add a Todo'
        name='name'
        value={name}
        onChange={handleInputChange}
      />
      <button type='submit'>Add</button>
    </form>
    </ div>
  )
}

export default TodoForm