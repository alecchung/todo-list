interface TodoFormProps {
  title: string;
  createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  updateTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  title,
  createTodo,
  handleInputChange,
  isEditing,
  updateTodo,
}) => {
  return (
    <form className="todo-form" onSubmit={isEditing ? updateTodo : createTodo}>
      <input
        type='text'
        required
        name='title'
        value={title}
        onChange={handleInputChange}
      />
      <span>{isEditing ? '' : 'Add a Todo'}</span>
      <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
    </form>
  );
};

export default TodoForm;