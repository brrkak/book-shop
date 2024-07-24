const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
app.listen(process.env.PORT)

const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')
const likesRouter = require('./routes/likes')
const cartsRouter = require('./routes/carts')
const ordersRouter = require('./routes/orders')
const categoryRouter = require('./routes/category')

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/likes',likesRouter)
app.use('/carts', cartsRouter)
app.use('/orders', ordersRouter)
app.use('/category',categoryRouter )