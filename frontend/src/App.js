import TodoList from "./components/TodoList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <div className="todo-container">
        <TodoList />

      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
