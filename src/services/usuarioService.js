const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const validaUser = require('../middlewares/validateUser');
const {
  HTTP_UNAUTHORIZED,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CREATED, HTTP_OK
} = require('../utils/utils');

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (email, senha) => {
  const jwtConfig = { expiresIn: '7d' };
  const payload = { email, senha, role: 'user' };

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const login = async (email, senha) => {
  const usuarioExiste = await usuarioModel.buscaLogin(email);
  if ((usuarioExiste && usuarioExiste.email) !== email || usuarioExiste.senha !== senha) {
    return {
      error: {
        code: HTTP_UNAUTHORIZED,
        message: 'Usuario ou senha incorretos!',
      }
    };
  }

  const { senha: _, ...usuario } = usuarioExiste;

  const token = createToken(email, senha);
  return {
    code: HTTP_OK,
    token,
    usuario
  };
};

const cadastrar = async (nome, email, senha) => {
  const novoUsuario = await usuarioModel.cadastrar(nome, email, senha);
  return {
    code: HTTP_CREATED,
    novoUsuario
  };
}

const validUsuario = async (body) => {
  const { nome, email } = body;
  const { error } = validaUser.validateUser(body);

  if (error) {
    return {
      error: {
        code: HTTP_BAD_REQUEST,
        message: 'Dados incorretos!',
      }
    };
  }

  const usuarioExiste = await usuarioModel.buscaUsuario(nome, email);
  if (usuarioExiste) {
    return {
      error: {
        code: HTTP_BAD_REQUEST,
        message: 'Usuário já existe!',
      }
    };
  }
  return '';
};

const atualizarUsuario = async (nomeAntigo, emailAntigo, novoNome, novoEmail) => {
  const usuario = await usuarioModel.buscaUsuario(nomeAntigo, emailAntigo);
  if (!usuario) {
    return {
      error: {
        code: HTTP_CONFLICT,
        message: 'Usuário não existe ou já foi atualizado!',
      }
    };
  }

  await usuarioModel.atualizarUsuario(usuario.nome, usuario.email, novoNome, novoEmail);

  return {
    code: HTTP_CREATED,
    message: 'Usuário atualizado com sucesso.',
  };
};

module.exports = {
  login,
  validUsuario,
  atualizarUsuario,
  cadastrar
};