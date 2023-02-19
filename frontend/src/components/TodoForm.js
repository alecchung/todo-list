import React from 'react'

const TodoForm = ({ createTodo, todo, handleInputChange }) => {
  return (
    <form className="todo-form" onSubmit={createTodo}>
      <input
        type='text'
        placeholder='Add a Todo'
        name='todo'
        value={todo}
        onChange={handleInputChange}
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm