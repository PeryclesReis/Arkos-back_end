const usuarioModel = require('../models/usuarioModel');

const login = () => {

};

const cadastrar = async (nome, email, senha) => {
  const result = await usuarioModel.cadastrar(nome, email, senha);
  return result;
};

const atualizarUsuario = () => {

};

module.exports = {
  login,
  cadastrar,
  atualizarUsuario,
};