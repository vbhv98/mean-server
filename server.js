const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const todoRouter = require('./routes/fetchTodos')

const app = express()

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)
app.use('/api/todos', todoRouter)

app.get('/', (_, res) => {
    return res.send('valid url: /api/login : POST && /api/register : POST')
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
})
