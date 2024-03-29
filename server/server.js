const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todoModel')
const todoRoutes = require('./routes/todoRoute')
const app = express()
const cors = require('cors')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://alec-todo.onrender.com']
}))
app.use('/api/todos', todoRoutes)

// Route
app.get('/', (req, res) => {
    res.send('Hello Home!')
})

// Port
const PORT = process.env.PORT || 5000

// connect to mongoose
mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`);
        })
    })
    .catch((err) => console.log(err))

