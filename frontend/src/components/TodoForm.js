import React from 'react'

const TodoForm = ({ todo, createTodo, handleInputChange,
  isEditing, updateTodo }) => {
  return (
    <form className="todo-form"
      onSubmit={isEditing ? updateTodo : createTodo}>
      <input
        type='text'
        placeholder='Add a Todo'
        name='todo'
        value={todo}
        onChange={handleInputChange}
      />
      <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
    </form>
  )
}

export default TodoForm