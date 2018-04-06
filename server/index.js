const express = require('express')
const app = express()
const productsRouter = require('./products/router')
const usersRouter = require('./users/router')
const loginsRouter = require('./logins/router')

app.listen(4001, () => console.log('Express API listening on port 4001'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(productsRouter)
app.use(usersRouter)
app.use(loginsRouter)
