const express = require('express')

const app = express()

//Route
app.get('/', (req, res) => {
    res.send('Hello Home!')
})


//Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})