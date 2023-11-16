const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose
  .connect('mongodb://127.0.0.1:27017/register')
  .then(() => console.log('db conectado'))

const app = express()

app.use(express.json())
app.use(routes)
app.listen(3000, () => {
  console.log('Servidor rodando!')
})
