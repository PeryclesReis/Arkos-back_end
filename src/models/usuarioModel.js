const { ObjectId } = require('mongodb');
const con = require('./connection');

const usuarios = async () => {
  const db = await con();
  const usuario = await db.collection('usuario').find().toArray();
  return usuario;
};

const buscaUsuario = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await con();
  const recipe = await db.collection('usuario').findOne({ _id: ObjectId(id) });
  return recipe;
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
};
