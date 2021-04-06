const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use('/', (req, res, err) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})