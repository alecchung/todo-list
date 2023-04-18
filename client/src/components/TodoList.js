import { useEffect, useState } from 'react'
import { toast, Flip } from 'react-toastify'
import { ThreeDots } from 'react-loading-icons'
import { client } from '../client'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [todoID, setTodoID] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    completed: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // get all todos
  const getTodos = async () => {
    const query = '*[_type == "todo"] | order(_createdAt)'
    client
      .fetch(query)
      .then((data) => {
        setTodos(data)
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 1500, position: 'top-center', transition: Flip })
      })

  }

  useEffect(() => {
    setIsLoading(true)
    getTodos()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])

  // create a todo
  const createTodo = (e) => {
    e.preventDefault()
    const doc = {
      _type: 'todo',
      title: formData.title,
      completed: false,
    }
    toast.success("Todo added.", { autoClose: 1500, position: 'top-center', transition: Flip })
    client
      .create(doc)
      .then(() => {
        getTodos()
        setFormData({ ...formData, title: '' })
      })
      .catch((error) => {
        toast.error(error.response.data, { autoClose: 1500, position: 'top-center', transition: Flip })
      })
  }

  // get a single todo
  const getTodo = async (todo) => {
    setFormData({ title: todo.title, completed: false })
    setTodoID(todo._id)
    setIsEditing(true)
  }

  // update a single todo
  const updateTodo = async (e) => {
    e.preventDefault()
    toast.success("Todo updated.", { autoClose: 1500, position: 'top-center', transition: Flip })
    client
      .patch(todoID)
      .set(formData)
      .commit()
      .then(() => {
        getTodos()
        setFormData({ ...formData, title: '' })
        setIsEditing(false)
      })
      .catch((error) => {
        toast.error(error.response.data, { autoClose: 1500, position: 'top-center', transition: Flip })
      })
  }

  // set a todo to 'completed'
  const setToCompleted = (id) => {
    toast.success("Todo completed.", { autoClose: 1500, position: 'top-center', transition: Flip })
    client
      .patch(id)
      .set({ completed: true })
      .commit()
      .then(() => {
        getTodos()
        setFormData({ ...formData, title: '' })
      })
      .catch(error => toast.error(error.message, { autoClose: 1500, position: 'top-center', transition: Flip }))
  }

  // delete todo
  const deleteTodo = async (id) => {
    toast.success("Todo deleted.", { autoClose: 1500, position: 'top-center', transition: Flip })
    client
      .delete(id)
      .then(() => {
        getTodos()
      })
      .catch(error => { toast.error(error.message, { autoClose: 1500, position: 'top-center', transition: Flip }) })
  }

  useEffect(() => {
    const completedTodo = todos.filter((todo) => {
      return todo.completed === true
    })
    setCompletedTodos(completedTodo)
  }, [todos])


  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm
        title={formData.title}
        handleInputChange={handleInputChange}
        createTodo={createTodo}
        isEditing={isEditing}
        updateTodo={updateTodo}
      />
      {todos.length > 0 &&
        <div className='--flex-between --pb'>
          <p>
            <b>Total: &nbsp; </b>{todos.length}
          </p>
          <p>
            <b>Done: &nbsp;</b>{completedTodos.length}&emsp;
          </p>
        </div>
      }

      {(isLoading && (
        <div className='--flex-center --my'>
          <ThreeDots
            fill='var(--light-blue)'
            fillOpacity={1}
            height="2em"
            speed={1}
            stroke="transparent"
            strokeOpacity={1}
            style={{
              margin: '2em'
            }}
          />
          <p><strong>Loading...</strong></p>
        </div>
      ))}

      {
        !isLoading && todos.length === 0
          ? (<p
            className='--py --lh2 --center-all'>
            You don't have any todos yet.<br /><br />Care to add one first?
          </p>)
          : (<>
            {todos.map((todo, index) =>
              <Todo
                key={todo._id}
                todo={todo}
                getTodo={getTodo}
                deleteTodo={deleteTodo}
                index={index}
                setToCompleted={setToCompleted}
              />
            )}</>)
      }
    </div>
  )
}

export default TodoList