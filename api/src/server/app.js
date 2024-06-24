import express from 'express'
import usersRoutes from './routes/usersRoutes.js'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', usersRoutes)

app.listen(PORT, () => console.log(`SERVER ON http://localhost:${PORT} 🚀`))
