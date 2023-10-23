const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'geeksdeck',
  password: 'password',
  port: 5432,
})

const getCategories = (req, res) => {  
    pool.query('SELECT * FROM category', (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows)
    })
  }

const createCategory = (req, res) => {
  const {name, description} = req.body
  pool.query('INSERT INTO category (name, description) VALUES ($1, $2)', [name, description], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results)
  })
}

const createFlashcard = (req, res) => {
  const {categoryId, term, definition, image} = req.body
  pool.query('INSERT INTO flashcard (categoryid, term, definition, image) VALUES ($1, $2, $3, $4)', [categoryId, term, definition, image], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results)
  })
}

const getFlashcards = (req, res) => {  
  pool.query('SELECT * FROM flashcard WHERE categoryid = ($1)', [req.query.id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getCategories,
  createCategory,
  createFlashcard,
  getFlashcards
}