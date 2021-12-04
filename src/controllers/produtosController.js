const prodService = require('../services/produtoService');

const produtos = async (_req, res) => {
  const produtos = await prodService.produtos();

  return res.status(200).json(produtos);
}

module.exports = {
  produtos
};
