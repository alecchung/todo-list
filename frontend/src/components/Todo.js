import React from 'react'
import { MdOutlineDownloadDone, MdDelete, MdEdit } from 'react-icons/md'

const Todo = ({ key, todo, index, getTodo, deleteTodo }) => {
  return (
    <div className='todo'>
      <p>
        <b>{index + 1}. </b>{todo.todo}
      </p>
      <div className='todo-icons'>
        <MdOutlineDownloadDone color='green' />
        <MdEdit color='blue' onClick={()=>getTodo(todo)} />
        <MdDelete color='red' onClick={() => deleteTodo(todo._id)}/>
      </div>
    </div>
  )
}

export default Todo