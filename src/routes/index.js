const express = require('express');
const rescue = require('express-rescue');
const usuarioController = require('../controllers/usuarioController');
const prodController = require('../controllers/produtosController');
const validUser = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/produtos', rescue(prodController.produtos));

router.post('/login', rescue(usuarioController.login));
router.post('/cadastrar', rescue(usuarioController.cadastrar));
router.put('/perfil', rescue(usuarioController.atualizarUsuario));

module.exports = router;
