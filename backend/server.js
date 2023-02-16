const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

//Route
app.get('/', (req, res) => {
    res.send('Hello Home!')
})


//Port
const PORT = process.env.PORT || 3000

mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

