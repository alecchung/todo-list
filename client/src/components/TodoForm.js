import React from 'react'

const TodoForm = ({ todo, createTodo, handleInputChange,
  isEditing, updateTodo }) => {
  return (
    <form className="todo-form"
      onSubmit={isEditing ? updateTodo : createTodo}>
      <input
        type='text'
        required
        name='todo'
        value={todo}
        onChange={handleInputChange}
      />
      <span>{isEditing ? '' : 'Add a Todo'}</span>
      <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
    </form>
  )
}

export default TodoForm