import { MdOutlineDone, MdDelete, MdEdit } from 'react-icons/md'

const Todo = ({ key, todo, index, getTodo,
  setToCompleted, deleteTodo }) => {
  return (
    <div className={todo.completed ? 'todo completed' : 'todo'}>
      <p>
        <b>&nbsp; {index + 1}. &nbsp; </b>{todo.todo}
      </p>
      <div className='todo-icons'>
        <MdOutlineDone
          sx={{ stroke: "#ffffff", strokeWidth: 1 }}
          onClick={todo.completed ? null : () => setToCompleted(todo)}
          color={todo.completed ? 'lightgray' : 'green'}
        />
        <MdEdit color='blue' onClick={() => getTodo(todo)} />
        <MdDelete color='red' onClick={() => deleteTodo(todo._id)} />
      </div>
    </div>
  )
}

export default Todo