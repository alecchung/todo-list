const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todoModel')
const taskRoutes = require('./routes/taskRoute')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/todos', taskRoutes)

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

