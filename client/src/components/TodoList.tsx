import { SetStateAction, useEffect, useState } from 'react'
import { toast, Flip } from 'react-toastify'
import { client } from '../client'
import Todo from './Todo'
import TodoForm from './TodoForm'
import loadingSvg from '../assets/three-dots.svg'

interface FormData {
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [todoID, setTodoID] = useState('')
  const [formData, setFormData] = useState<FormData>({
    title: '',
    completed: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // get all todos
  const getTodos = async () => {
    setIsLoading(true)
    const query = '*[_type == "todo"] | order(_createdAt)'

    client
      .fetch(query)
      .then((data) => {
        setTimeout(() => {
          setTodos(data)
          setIsLoading(false)
        }, 0);
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 1500, position: 'top-center', transition: Flip })
      })

  }

  useEffect(() => {
    getTodos()
  }, [])

  // create a todo
  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
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
  const getTodo = async (todo: { title: any; _id: SetStateAction<string> }) => {
    setFormData({ title: todo.title, completed: false })
    setTodoID(todo._id)
    setIsEditing(true)
  }

  // update a single todo
  const updateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
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
  const setToCompleted = (id: string) => {
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
  const deleteTodo = async (id: string) => {
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
      return todo['completed'] === true
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

      {(isLoading && (
        <div className='--flex-center'>
          <img
            className='--m'
            src={loadingSvg}
            alt='loading'
            width={80}
          />
          <p className='--m'><strong>Loading ...</strong></p>
        </div>
      ))}

      {todos.length > 0 && (
        <div className='--flex-between --pb'>
          <p>
            <b>Total: &nbsp; </b>{todos.length}
          </p>
          <p>
            <b>Done: &nbsp;</b>{completedTodos.length}&emsp;
          </p>
        </div>
      )}

      {(!isLoading && todos.length === 0)
        ? (
          <p className='--py --lh2 --center-all'>
            You don't have any todos yet.<br />
            Care to add one first?
          </p>
        )
        : (<>
          {todos.map((todo, index) =>
            <Todo
              key={todo['_id']}
              todo={todo}
              getTodo={getTodo}
              deleteTodo={deleteTodo}
              index={index}
              setToCompleted={setToCompleted}
            />
          )}
        </>)
      }
    </div>
  )
}

export default TodoList