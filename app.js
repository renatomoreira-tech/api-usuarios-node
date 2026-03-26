const express = require('express')
const app = express()

app.use(express.json())

app.get('/usuarios', (req, res) => {
  res.json([{ nome: 'Renato', idade: 30 }])
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})