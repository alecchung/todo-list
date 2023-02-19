import React from 'react'
import { MdOutlineDownloadDone, MdDelete, MdEdit } from 'react-icons/md'

const Todo = () => {
  return (
    <div className='todo'>
      <p>
        <b>1. </b>Task 1
      </p>
      <div className='todo-icons'>
        <MdOutlineDownloadDone color='green' />
        <MdEdit color='blue' />
        <MdDelete color='red' />
      </div>
    </div>
  )
}

export default Todo