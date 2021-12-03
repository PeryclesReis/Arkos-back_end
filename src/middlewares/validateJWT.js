const Jwt = require('jsonwebtoken');
const { buscaUsuario } = require('../models/usuarioModel');

const JWT_SECRET = process.env.JWT_SECRET

const validUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status()
      .json({ message: 'missing auth token' });
  }

  try {
    const { user: { email } } = Jwt.verify(token, JWT_SECRET);
    const user = await buscaUsuario(email);

    if (!user) {
      return res
        .status()
        .json({ message: 'Not found user.' });
    }
    req.user = user;

    return next();
  } catch (error) {
    return res.status().json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validUser,
};