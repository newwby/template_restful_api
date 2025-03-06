const express = require('express')
const mw = require('./middleware/userMiddleware')
const db = require('./controllers/userController')
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
app.get('/users/:id', mw.validateUserID, db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', mw.validateUserID, db.updateUser)
app.delete('/users/:id', mw.validateUserID, db.removeUser)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})