const usuarioModel = require('../models/usuarioModel');
const validaUser = require('../middlewares/validateUser');

// const createToken = (user) => {
//   const jwtConfig = { expiresIn: '7d' };
//   const payload = { user, role: 'user' };

//   const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
//   return token;
// };

const login = async (email) => {
  const usuarioExiste = await usuarioModel.buscaLogin(email);

  if (!usuarioExiste) {
    return {
      error: {
        code: 409,
        message: 'Usuário não existe!',
      }
    };
  }
  return '';
};

const cadastrar = async (nome, email, senha) => {
  const novoUsuario = await usuarioModel.cadastrar(nome, email, senha);
  console.log(novoUsuario);
  return novoUsuario;
}

const validUsuario = async (body) => {
  const { nome, email } = body;
  const { error } = validaUser.validateUser(body);

  if (error) {
    return {
      error: {
        code: 402,
        message: 'Dados incorretos!',
      }
    };
  }

  const usuarioExiste = await usuarioModel.buscaUsuario(nome, email);
  if (usuarioExiste) {
    return {
      error: {
        code: 409,
        message: 'Usuário já existe!',
      }
    };
  }
  return '';
};

const atualizarUsuario = () => {

};

module.exports = {
  login,
  validUsuario,
  atualizarUsuario,
  cadastrar
};