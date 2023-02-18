const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.json())

// Route
app.get('/', (req, res) => {
    res.send('Hello Home!')
})

// Create a todo task
app.post('/api/todos', async (req, res) => {
    console.log(req.body);
    res.send('Todo Task Created.')
})

// Port
const PORT = process.env.PORT || 3000

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

