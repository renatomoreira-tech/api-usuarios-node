const express = require('express')
const app = express()

app.use(express.json())

let usuarios = [
  { id: 1, nome: 'Renato', idade: 30 },
  { id: 2, nome: 'Maria', idade: 25 }
]

// GET - listar todos
app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

// GET - buscar por id
app.get('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id)
  const usuario = usuarios.find(u => u.id === id)

  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  res.json(usuario)
})

// POST - criar usuário
app.post('/usuarios', (req, res) => {
  const { nome, idade } = req.body

  if (!nome || !idade) {
    return res.status(400).json({ mensagem: 'Nome e idade são obrigatórios' })
  }

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    idade
  }

  usuarios.push(novoUsuario)
  res.status(201).json(novoUsuario)
})

// PUT - atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id)
  const { nome, idade } = req.body

  const indice = usuarios.findIndex(u => u.id === id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  if (!nome || !idade) {
    return res.status(400).json({ mensagem: 'Nome e idade são obrigatórios' })
  }

  usuarios[indice] = { id, nome, idade }
  res.json(usuarios[indice])
})

// DELETE - remover usuário
app.delete('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id)
  const indice = usuarios.findIndex(u => u.id === id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' })
  }

  const removido = usuarios.splice(indice, 1)
  res.json({ mensagem: 'Usuário removido com sucesso', usuario: removido[0] })
})
  
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})