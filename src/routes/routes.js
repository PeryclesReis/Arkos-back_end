const express = require('express');
const rescue = require('express-rescue');
const usuarioService = require('../services/usuarioService');

const router = express.Router();

router.get('/login', rescue(async(req, res) => {
  return res.status(200).json('Login');
}));

router.post('/cadastrar', async(req, res) => {
  const { nome, email, senha } = req.body;
  usuarioService.cadastrar(nome, email, senha);

  return res.status(200).json('Usuário cadastrado com sucesso!');
});

router.put('/perfil', async(req, res) => {
  console.log(req.body);
  return res.status(200).json('Atualizado com sucesso!');
});

module.exports = router;
