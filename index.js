const express = require('express')
const db = require('./routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})