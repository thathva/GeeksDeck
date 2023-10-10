const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const db = require('./queries')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/create-category', db.createCategory)
app.post('/create-flashcard', db.createFlashcard)
app.get('/get-categories', db.getCategories)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })