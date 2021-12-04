const usuarioService = require('../services/usuarioService');

const login = async (req, res) => {
  const { email, senha } = req.body;

  const result = await usuarioService.login(email, senha);
  if(result.error) {
    return res.status(result.error.code).json(result.error);
  }

  return res.status(result.code).json({ token: result.token, usuario: result.usuario });
};

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const { error } = await usuarioService.validUsuario(req.body);
  if(error) {
    return res.status(error.code).json(error);
  }

  const { novoUsuario, code } = await usuarioService.cadastrar(nome, email, senha);
  return res.status(code).json({ novoUsuario, message: 'Usuário cadastrado com sucesso!' });
};

const atualizarUsuario = async (req, res) => {
  const { dados: { nomeAntigo, emailAntigo, novoNome, novoEmail } } = req.body;

  const result = await usuarioService.atualizarUsuario(nomeAntigo, emailAntigo, novoNome, novoEmail);
  if(result.error) {
    return res.status(result.error.code).json(result.error);
  }

  return res.status(result.code).json({ message: result.message });
};

module.exports = {
  login,
  cadastrar,
  atualizarUsuario
};
