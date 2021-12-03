const { ObjectId } = require('mongodb');
const con = require('./connection');

const usuarios = async () => {
  const db = await con();
  const usuarios = await db.collection('usuario').find().toArray();
  return usuarios;
};

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

const atualizarUsuario = async (id, {nome, email, senha}) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await con();
  await db.collection('usuario')
    .updateOne({ _id: ObjectId(id) }, { $set: { nome, email, senha } });

  const usuario = await buscaUsuario(id);
  return usuario;
};

module.exports = {
  usuarios,
  buscaUsuario,
  cadastrar,
  atualizarUsuario,
  buscaLogin,
};
