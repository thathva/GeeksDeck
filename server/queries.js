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
  const {term, definition, categoryId} = req.body
  pool.query('INSERT INTO flashcard (term, definition, categoryId) VALUES ($1, $2, $3)', [term, definition, categoryId], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results)
  })
}
module.exports = {
  getCategories,
  createCategory,
  createFlashcard
}