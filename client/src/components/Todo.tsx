import React from 'react';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface TodoProps {
  todo: any;
  index: number;
  getTodo: (todo: any) => void;
  setToCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, index, getTodo, setToCompleted, deleteTodo }) => {
  return (
    <div className={todo.completed ? 'todo completed' : 'todo'}>
      <p>
        <b>&nbsp; {index + 1}. &nbsp; </b>
        {todo.title}
      </p>
      <div className='todo-icons'>
        {/* 'DONE' / 'MARK AS DONE' icon */}
        <MdDone
          data-tooltip-id="my-tooltip"
          data-tooltip-content={todo.completed ? 'Already done' : 'Mark as Done'}
          onClick={todo.completed ? undefined : () => setToCompleted(todo._id)}
          color={todo.completed ? 'lightgray' : 'green'}
        />
        <Tooltip id="my-tooltip" />

        {/* EDIT icon */}
        <MdEdit
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Edit"
          color='blue'
          onClick={() => getTodo(todo)}
        />
        <Tooltip id="my-tooltip" />

        {/* DELETE icon */}
        <MdDelete
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Delete"
          color='red'
          onClick={() => deleteTodo(todo._id)}
        />
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  )
}

export default Todo;