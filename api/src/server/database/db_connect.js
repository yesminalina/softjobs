import pg from 'pg'

const { Pool } = pg

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  AllowExitOnIdle: true
}

const pool = new Pool(config)

const db = (query, values) => pool.query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => {
    const error = { status: false, code, message }
    throw error
  })

export default db
