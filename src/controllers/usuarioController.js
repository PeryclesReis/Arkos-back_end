const usuarioService = require('../services/usuarioService');

const login = async (req, res) => {
  const { email } = req.body;

  const { error } = await usuarioService.login(email);
  if(error) {
    return res.status(error.code).json(error);
  }
  return res.status(200).json({ message: 'Login efetuado com sucesso!' });
};

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const { error } = await usuarioService.validUsuario(req.body);
  if(error) {
    return res.status(error.code).json(error);
  }

  const novoUsuario = await usuarioService.cadastrar(nome, email, senha);
  return res.status(200).json({ novoUsuario, message: 'Usuário cadastrado com sucesso!' });
};

const atualizarUsuario = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: 'Atualizado com sucesso!' });
};

module.exports = {
  login,
  cadastrar,
  atualizarUsuario
};
