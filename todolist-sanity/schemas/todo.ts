import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'todo',
  title: 'Todo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
    }),

  ],
  initialValue: {
    completed: false,
  }
})
