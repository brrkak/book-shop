const express = require('express')
const app = express()
const cors = require('cors')


const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')
const likesRouter = require('./routes/likes')
const cartsRouter = require('./routes/carts')
const ordersRouter = require('./routes/orders')
const categoryRouter = require('./routes/category');


app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));


app.use('/api/users', usersRouter)
app.use('/api/books', booksRouter)
app.use('/api/likes',likesRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/category',categoryRouter )

app.listen(process.env.PORT)