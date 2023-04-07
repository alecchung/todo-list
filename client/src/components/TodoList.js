import { useEffect, useState } from 'react'
import { toast, Flip } from 'react-toastify'
import axios from 'axios'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { ThreeDots } from 'react-loading-icons'
import placeHolder from '../assets/placeHolder.json'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTemp, setIsTemp] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [todoID, setTodoID] = useState('')

  const [formData, setFormData] = useState({
    todo: '',
    completed: false
  })

  const URL = process.env.REACT_APP_SERVER_URL
  const { todo } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // get all todos
  const getTodos = async () => {
    setIsLoading(true)
    setIsTemp(true)
    try {
      const { data } = await axios.get(`${URL}/api/todos`)
      setTodos(data)
      setIsLoading(false)
      setIsTemp(false)
    } catch (error) {
      toast.error(error.message, { position: 'top-center', transition: Flip })
      setIsTemp(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsTemp(true)
    setTimeout(() => {
      setIsTemp(false)
    }, 500)
  }, [])

  useEffect(() => {
    getTodos()
  }, [])

  // get a single todo
  const getTodo = async (todo) => {
    setFormData({ todo: todo.todo, completed: false })
    setTodoID(todo._id)
    setIsEditing(true)
  }

  // update a single todo
  const updateTodo = async (e) => {
    e.preventDefault()
    if (todo === '') {
      return toast.error('No todo provided', { position: 'top-center', transition: Flip })
    }
    try {
      await axios.put(`${URL}/api/todos/${todoID}`, formData)
      setFormData({ ...formData, todo: '' })
      setIsEditing(false)
      toast.success("Todo updated.", { position: 'top-center', transition: Flip })
      getTodos()
    } catch (error) {
      toast.error(error.response.data, { position: 'top-center', transition: Flip })
    }
  }

  // create a todo
  const createTodo = async (e) => {
    e.preventDefault()
    if (todo === "") {
      return toast.error('No todo provided', { position: 'top-center', transition: Flip })
    }
    try {
      // console.log(formData);
      await axios.post(`${URL}/api/todos`, formData)
      toast.success("Todo added.", { position: 'top-center', transition: Flip })
      setFormData({ ...formData, todo: "" })
      getTodos()
    } catch (error) {
      toast.error(error.message, { position: 'top-center', transition: Flip })
    }
  }

  // set a todo to 'completed'
  const setToCompleted = async (todo) => {
    const newFormData = {
      todo: todo.todo,
      completed: true,
    }
    try {
      await axios.put(`${URL}/api/todos/${todo._id}`, newFormData)
      toast.success("Todo completed.", { position: 'top-center', transition: Flip })
      getTodos()
    } catch (error) {
      toast.error(error.message, { position: 'top-center', transition: Flip })
    }
  }

  // delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${URL}/api/todos/${id}`)
      toast.success("Todo deleted.", { position: 'top-center', transition: Flip })
      getTodos()
    } catch (error) {
      toast.error(error.message, { position: 'top-center', transition: Flip })
    }
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
        todo={todo}
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
            <b>Done: &nbsp;</b>{completedTodos.length || 2}&emsp;
          </p>
        </div>
      }

      {(isTemp && (
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
        !isTemp && isLoading &&
        (<>

          <div className='--flex-between --pb'>
            <p>
              <b>Total: &nbsp; </b>{placeHolder.length}
            </p>
            <p>
              <b>Done: &nbsp;</b>2&emsp;
            </p>
          </div>

          {placeHolder.map((todo, index) => {
            return (
              <Todo
                key={todo._id}
                todo={todo}
                getTodo={getTodo}
                deleteTodo={deleteTodo}
                index={index}
                setToCompleted={setToCompleted}
              />
            )
          })}
        </>)
      }
      {
        !isLoading && todos.length === 0
          ? (<p
            className='--py --lh2 --center-all'>
            You don't have any todos yet.<br /><br />Care to add one first?
          </p>)
          : (<>
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={todo._id}
                  todo={todo}
                  getTodo={getTodo}
                  deleteTodo={deleteTodo}
                  index={index}
                  setToCompleted={setToCompleted}
                />
              )
            })}</>)
      }
    </div>
  )
}

export default TodoList