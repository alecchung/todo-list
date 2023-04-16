export default {
  name: 'todo',
  type: 'document',
  title: 'Todo',
  fields: [
    {
      name: 'todo',
      title: 'Todo',
      type: 'string',
      required: [true, "Please add a todo: "],
    },
    {
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
      required: true,
      default: false,
    },
  ]
}