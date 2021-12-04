const con = require('./connection');
// const axios = require('axios');

const buscaLogin = async ( email) => {
  const db = await con();
  const usuario = await db.collection('usuario').findOne({ email });
  return usuario;
};

const buscaUsuario = async (nome, email) => {
  const db = await con();
  const usuario = await db.collection('usuario').findOne({ nome, email });
  return usuario;
};

const cadastrar = async (nome, email, senha) => {
  const db = await con();
  const novoUsuario = await db
    .collection('usuario').insertOne({ nome, email, senha });
  return novoUsuario.ops[0];
};

const atualizarUsuario = async (nome, email, novoNome, novoEmail) => {
  const db = await con();
  await db.collection('usuario')
    .updateOne({ nome, email }, { $set: { nome: novoNome, email: novoEmail } });

  const usuario = await buscaUsuario(novoNome, novoEmail);
  return usuario;
};

// testes feitos com endpoint da api abaixo
// const usuarios = async () => {
//   const { data } = await axios.get('https://fakestoreapi.com/users').then(res=>res);
//   const { address:_, ...usuarios } = data;

//   return usuarios;
// };

// const buscaUsuario = async (id) => {
//   const { data } = await axios.get(`https://fakestoreapi.com/users/${id}`).then(res=>res);
//   const { address:_, ...usuarios } = data;

//   return usuarios;
// };

module.exports = {
  buscaUsuario,
  cadastrar,
  atualizarUsuario,
  buscaLogin,
};
