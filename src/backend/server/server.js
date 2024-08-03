const express = require("express")
const PORT = 5500

const app = express()

app.get('/test', (req, res) => {
    res.json({ ok: true })
})

app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`))