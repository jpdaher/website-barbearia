const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const database = require('../database/database')
const PORT = 8080

const app = express()

app.get('/barbeiros', async (req, res) => {
    const barbeiros = await database.getBarbeiros()
    res.json(barbeiros)
})

app.listen(PORT, () => console.log(`Server now listening on port http://localhost:${PORT}`))
